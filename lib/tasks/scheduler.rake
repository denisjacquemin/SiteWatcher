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

desc "Generate htmlfile"
task :generate_htmlfile => :environment do
  Site.all.each do |site| # for each site
    snippets = Snippet.where(:site_id => site.id).last(2) # get the 2 latest snippets
    # 1. check if there are, at least 2 snippets
    # 2. check if the difference already exist
    if snippets.size == 2 # 1.
      if Difference.where(:old_snippet_id => snippets[0], :new_snippet_id => snippets[1]).empty? # 2.
        if snippets[0].content != snippets[1].content # check if a difference id found
          
          # htmlfile generation starts here
          # -------------------------------
          # 1. generate new snippets with differences highlighted
          # 2. get original document
          # 3. add stylesheet to do document for diff styling
          # 4. replace snippet in original doc with the one with the differences highlighted
          # 5. parse original doc to have absolute urls
          # 6. save doc to s3
          
          # 1.
          diff_snippet = DiffHtml.diff(snippets[0].content, snippets[1].content) # add <ins> tags to highlight differences
          
          # 2.
          original_doc = Nokogiri::HTML(open(site.url)) # TODO: looks like there is an issue with encoding type
          
          # 3.
          head = original_doc.at_css('head')
          link = Nokogiri::XML::Node.new('link', original_doc)
          link.set_attribute("rel", "stylesheet")
          link.set_attribute("href", "http://sitewatcher.herokuapp.com/stylesheets/diff.css")
          link.set_attribute("type", "text/css")
          head << link 
          
          # 4.
          snippet_to_replace = original_doc.at_css(site.selector) # get original snippet
          new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}" # get nokogiri object from the diff_snippet
          snippet_to_replace.replace new_snippet # proceed with replacement
          
          
          # 5.
          s = URI.split(site.url)
          host = s[0] + '://' + s[2]
          original_html = original_doc.to_xhtml
          
          puts "before original_html: #{original_html}"
          
          original_doc.css("[src]").each do |node|
            url = node.attr('src')
            unless url.start_with?('http://') or url.strip.empty? or url.start_with?('javascript')
              #puts "src: #{url} => #{URI.parse(host).merge(URI.parse(url)).to_s}"
              original_html.gsub!(url, URI.parse(host).merge(URI.parse(url)).to_s)
            end
          end
          original_doc.css("[href]").each do |node|
            url = node.attr('href')            
            unless url.start_with?('http://') or url.strip.empty? or url.start_with?('javascript') 
              puts "href: #{url} => #{URI.parse(host).merge(URI.parse(url)).to_s}"
              original_html.gsub!(url, URI.parse(site.url).merge(URI.parse(url)).to_s)
            end
          end
          
          puts "after original_html: #{original_html}"
          
          
          # 6.
          htmlfile = File.new("#{site.name}.html", 'w') 
          htmlfile.puts original_html
          difference = Difference.new
          difference.htmlfile = htmlfile
          difference.site_id = site.id
          difference.old_snippet_id = snippets[0].id
          difference.new_snippet_id = snippets[1].id
          #difference.save!
          
          puts "htmfile saved for #{site.name}"
          
        end
      end # => difference already exist
    end # => less than 2 snippets found
    
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
        
        html = doc.to_html
        
        hrefs = doc.css("[href]") # get all the stylesheets url, later they'll be transform to be sure they are absolute 

        hrefs.each do |href_tag| # for each stylesheet url 
          href = href_tag.attr('href')  # get the href from href attribute
          
          href_full_url = URI.parse(root).merge(URI.parse(href)).to_s # build the absolute path
          
          html = html.gsub(href, href_full_url)
        end

        snippet_to_replace = doc.at_css(site.selector)
        new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    
        snippet_to_replace.replace new_snippet

        
        # replace all images path with there absolute equivalent
        src_tags = doc.css("[src]")
        src_tags.each do |src_tag|
          src = src_tag.attr('src')
          
          src_full_url = URI.parse(root).merge(URI.parse(src)).to_s # build the absolute path
          html = html.gsub(src, src_full_url)
        end        
        
        
        htmlfile = File.new("test.html", 'w') 
        htmlfile.puts html

        puts html
        
        difference = Difference.new
        difference.htmlfile = htmlfile
        difference.site_id = site.id
        difference.old_snippet_id = snippets[0].id
        difference.new_snippet_id = snippets[1].id
        difference.save! # should save it to s3 and add one record to db
        htmlfile.close
      end
    end
  end
end

desc "Generate images"
task :generate_images => :environment do
  differences = Difference.where(:snapshot => nil)
  differences.each do |difference|

    kit = IMGKit.new(difference.htmlfile.url, :quality => 70)
    file = kit.to_file("#{difference.site.name}.jpg")
    difference.snapshot = File.open file
    
    difference.save!
  end
end
