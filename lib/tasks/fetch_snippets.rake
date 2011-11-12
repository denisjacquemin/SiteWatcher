desc "Fetch Snippets"
task :fetch_snippets => :environment do
  require 'nokogiri'
  require 'open-uri'
  require 'iconv'
  
  Site.all.each do |site|
    puts "opening #{site.url}"
    doc = Nokogiri::HTML(open(site.url))
    content = ::Iconv.conv('UTF-8//IGNORE', 'UTF-8', doc.at_css(site.selector).to_s + ' ')[0..-2]
    Snippet.create( :site_id => site.id, :content => content)
  end
end

