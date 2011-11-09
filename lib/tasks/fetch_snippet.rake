desc "Fetch Snippets"
task :fetch_snippets => :environment do
  require 'nokogiri'
  require 'open-uri'
  
  Site.all.each do |site|
    doc = Nokogiri::HTML(open(site.url))
    Snippet.create( :site_id => site.id, :content => doc.at_css(site.selector).to_s)
  end
end

