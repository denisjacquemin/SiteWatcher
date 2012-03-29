module Fetcher
  class Linkedin
    def fetch(person)
      puts "Fetcher:Linkedin.fetch(#{person.firstname} #{person.lastname})"
      begin
        agent = Mechanize.new
        agent.keep_alive = false
    
        # get homepage
        home_page = agent.get('http://www.linkedin.com/')
    
        # get search form
        search_form = home_page.form('searchForm')
    
        # fill in fields
        search_form['first'] = person.firstname
        search_form['last'] = person.lastname
    
        # submit the form
        agent.submit(search_form, search_form.buttons.first)
        vcards = agent.page.search('.vcard')
        info = Information.new
        vcards.each_with_index do |vcard, index|
        
        # fetch all information
        jobtitle = vcard.search('.vcard-basic .title').text().gsub("\n","").strip()
        linkedin_profile_url = vcard.search('h2 strong a').attr('href').value()
        location = vcard.search('.location').text().gsub("\n","").strip()
        industry = vcard.search('.industry').text().gsub("\n","").strip()
        past = vcard.search('.past-content').text()
        
        profile = Profile.where(:url => linkedin_profile_url).first
        profile = Profile.new(:url => linkedin_profile_url, :person_id => person.id, :profile_type_id => 1) if profile.nil?
        
        profile.elements << Element.new(:label => 'jobtitle', :value => jobtitle)
        profile.elements << Element.new(:label => 'location', :value => location)
        profile.elements << Element.new(:label => 'industry', :value => industry)
        profile.elements << Element.new(:label => 'past',     :value => past)
        profile.save
        
        puts "#{index}. Profile LinkedIn for #{person.firstname} #{person.lastname}: #{jobtitle}"
      end
      rescue Net::HTTP::Persistent::Error
        puts "Net::HTTP::Persistent::Error for #{person.firstname} #{person.lastname}"
      rescue SocketError
        puts "SocketError for #{person.firstname} #{person.lastname}"
      rescue Timeout::Error
        puts "caught Timeout::Error for #{person.firstname} #{person.lastname} !"
      rescue Mechanize::ResponseCodeError => e
          case e.response_code
            when "502"
              puts "  caught Net::HTTPBadGateway for #{person.firstname} #{person.lastname}!"
              return result
            when "404"
              puts "  caught Net::HTTPNotFound for #{person.firstname} #{person.lastname}!"
            else
              puts "caught Exception for #{person.firstname} #{person.lastname}" + e.response_code
          end
      end
    end
  end
end