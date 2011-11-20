desc "Fetch Snippets"
task :fetch_snippets => :environment do
  require 'nokogiri'
  require 'open-uri'
  require 'iconv'
  
  sites = Site.all
  
  sites.each do |site|
    puts "opening #{site.url}"
    doc = Nokogiri::HTML(open(site.url))
    #options = {:encoding => 'ISO-8859-1'}
    current_snippet = ::Iconv.conv('UTF-8//IGNORE', 'ISO-8859-1', doc.at_css(site.selector).to_xhtml + ' ')[0..-2]
    
    last_snippet = Snippet.where(:site_id => site.id).last()
    
    if last_snippet == nil or current_snippet != last_snippet.content
      puts "difference detected, saving new snippet to db" 
      Snippet.create( :site_id => site.id, :content => current_snippet)
    else 
      puts "No difference detected"
    end
  end
end

desc "Send Alerts"
task :send_alerts => :environment do
  differences = Difference.all
  differences.each do |difference|
    AlertMailer.difference_found_email(difference).deliver
  end
end

desc "Detect Changes"
task :detect_changes => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    root = site.url # the site root from site.url

    snippets = Snippet.where(:site_id => site.id).last(2)

    if snippets.size == 2 # if 2 snippets found continue
      if snippets[0].content != snippets[1].content # if a difference is found continue
        diff_snippet = DiffHtml.diff(snippets[0].content, snippets[1].content) # add <ins> tags to highlight differences

        # image starts here
        puts "opening #{site.url}"
        doc = Nokogiri::HTML(open(site.url)) # first get the current document as a Nokogiri object
        hrefs = doc.css("[href]") # get all the stylesheets url, later they'll be transform to be sure they are absolute 

        hrefs.each do |href_tag| # for each stylesheet url 
          href = href_tag.attr('href')  # get the href from href attribute
          
          href_full_url = URI.parse(root).merge(URI.parse(href)).to_s # build the absolute path
          
          html = html.gsub(href, href_full_url)
        end

        snippet_to_replace = doc.at_css(site.selector)
        new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    
        snippet_to_replace.replace new_snippet

        html = doc.to_html
        
        # replace all images path with there absolute equivalent
        src_tags = doc.css("[src]")
        src_tags.each do |src_tag|
          src = src_tag.attr('src')
          
          src_full_url = URI.parse(root).merge(URI.parse(src)).to_s # build the absolute path
          html = html.gsub(src, src_full_url)
        end        
        
        
        htmlfile = File.new("#{site.name}.html", 'w') 
        htmlfile.puts html

        puts html
        
        difference = Difference.new
        difference.htmlfile = htmlfile
        difference.site_id = site.id
        difference.old_snippet_id = snippets[0].id
        difference.new_snippet_id = snippets[1].id
        difference.save! # should save it to s3 and add one record to db
        #uploader.store!(open(file))        
      end
    end
  end
end

desc "Generate images"
task :generate_images => :environment do
  differences = Difference.all
  differences.each do |difference|
    kit = IMGKit.new(difference.htmlfile.url, :quality => 70)
    
    css << open('http://sitewatcher.herokuapp.com/stylesheets/diff.css')
    kit.stylesheets = css
    difference.snapshot = kit.to_file("#{site.name}.jpg")
    difference.save!
  end
end
