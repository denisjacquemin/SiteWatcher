desc "Detect Changes"
task :detect_changes => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    snippets = Snippet.where(:site_id => site.id).last(2)

    if snippets.size == 2 # if 2 snippets found continue
      if snippets[0].content != snippets[1].content # if a difference is found continue
        diff_snippet = DiffHtml.diff(snippets[0].content, snippets[1].content) # add <ins> tags to highlight differences

        # image starts here
        
        doc = Nokogiri::HTML(open(site.url)) # first get the current document as a Nokogiri object
        stylesheets = doc.css("link[href$='css']") # get all the stylesheets url, later they'll be transform to be sure they are absolute 
        css = stylesheets.collect do |stylesheet| # for each stylesheet url 
          href = stylesheet.attr('href')  # get the url in href
          root = site.url # the site root is site.url
          
          stylesheet_full_url = URI.parse(root).merge(URI.parse(href)).to_s # build the absolute path
          
          puts href
          puts stylesheet_full_url
          
          open(stylesheet_full_url) #
        end

        snippet_to_replace = doc.at_css(site.selector)

        new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    

        snippet_to_replace.parent = new_snippet

        kit = IMGKit.new(doc.to_html, :quality => 70)

        kit.stylesheets = css

        uploader = SnapshotUploader.new
        file = kit.to_file("#{site.name}.jpg") 
        #uploader.store!(open(file))        
      end
    end
  end
end

