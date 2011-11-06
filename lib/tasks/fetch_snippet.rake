desc "Fetch Snippets"
task :fetch_snippets => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    doc = Nokogiri::HTML(open(site.url))
    Snippet.create( :site_id => site.id, :content => doc.to_xhtml )
    
  end
end

