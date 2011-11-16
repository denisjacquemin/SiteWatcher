class AlertMailer < ActionMailer::Base
  default from: "info@example.com"
  
  def difference_found_email(difference)
    puts "In difference_found_email"
    @site = difference.site
    @difference = difference
    mail(:to => @site.email, :subject => "Watcher Alert for #{@site.name}")
  end
end
