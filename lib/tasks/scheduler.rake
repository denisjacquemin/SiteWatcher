desc "Fetch Snippets"
task :fetch_snippets => :environment do
  require 'nokogiri'
  require 'open-uri'
  require 'iconv'
  
  sites = Site.all
  
  sites.each do |site|
    puts "opening #{site.url}"
    doc = Nokogiri::HTML(open(site.url))
    current_snippet = ::Iconv.conv('UTF-8//IGNORE', 'UTF-8', doc.at_css(site.selector).to_s + ' ')[0..-2]
    
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

