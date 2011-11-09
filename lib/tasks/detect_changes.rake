desc "Detect Changes"
task :detect_changes => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    snippets = Snippet.where(:site_id => site.id).last(2)
            
    diff_snippet = DiffHtml.diff(snippets[0].content, snippets[1].content)
  
    kit = IMGKit.new(diff_snippet, :quality => 50)
    
    # get stylesheets
    doc = Nokogiri::HTML(open(site.url))
    stylesheets = doc.css("link[href$='css']")
    css = stylesheets.collect do |stylesheet|
      open(stylesheet.attr('href'))
    end

    kit.stylesheets = css
    
    kit.to_file('/Users/denisjacquemin/file.jpg')    
  end
end

