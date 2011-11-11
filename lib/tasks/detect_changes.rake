desc "Detect Changes"
task :detect_changes => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    snippets = Snippet.where(:site_id => site.id).last(2)

    if snippets.size == 2 # if 2 snippets found continue
      if snippets[0].content != snippets[1].content # if a difference is found continue
        diff_snippet = DiffHtml.diff(snippets[0].content, snippets[1].content)

        # generate image
        
        # get stylesheets
        doc = Nokogiri::HTML(open(site.url))
        stylesheets = doc.css("link[href$='css']")
        css = stylesheets.collect do |stylesheet|

          puts stylesheet.attr('href')

          open(stylesheet.attr('href'))
        end

        snippet_to_replace = doc.at_css(site.selector)

        new_snippet = Nokogiri::HTML::DocumentFragment.parse "#{diff_snippet}"    

        snippet_to_replace.parent = new_snippet

        kit = IMGKit.new(doc.to_html, :quality => 70)

        kit.stylesheets = css

        kit.to_file("/Users/denisjacquemin/#{site.name}.jpg")    
      end
    end
  end
end

