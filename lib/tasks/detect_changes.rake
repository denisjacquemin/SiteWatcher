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
        stylesheets = doc.css("link[href$='css']") # get all the stylesheets url, later they'll be transform to be sure they are absolute 

        css = stylesheets.collect do |stylesheet| # for each stylesheet url 
          href = stylesheet.attr('href')  # get the href from href attribute
          
          stylesheet_full_url = URI.parse(root).merge(URI.parse(href)).to_s # build the absolute path
          
          puts href
          puts stylesheet_full_url
          
          open(stylesheet_full_url)
        end

        snippet_to_replace = doc.at_css(site.selector)
        new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    
        snippet_to_replace.replace new_snippet

        html = doc.to_html
        
        # replace all images path with there absolute equivalent
        src_tags = doc.css("[src]")
        src_tags.each do |src_tag|
          src = src_tag.attr('src')
          puts src
          
          src_full_url = URI.parse(root).merge(URI.parse(src)).to_s # build the absolute path
          puts src_full_url
          html = html.gsub(src, src_full_url)
        end
        
        kit = IMGKit.new(html, :quality => 70)
        
        css << open('http://0.0.0.0:5000/stylesheets/diff.css')
        kit.stylesheets = css

        uploader = SnapshotUploader.new
        difference = Difference.new
        difference.site_id = site.id
        file = kit.to_file("#{site.name}.jpg") 
        difference.snapshot = File.open file
        difference.save! # should sva it to s3 and add one record to db
        #uploader.store!(open(file))        
      end
    end
  end
end

