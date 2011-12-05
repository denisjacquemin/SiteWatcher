class Linkedin
  
  def fetch_informations(person)
    begin
      agent = Mechanize.new
    
      # get linkedin homepage
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
        title = vcard.search('.vcard-basic .title').text()
        location = vcard.search('.location').text()
        industry = vcard.search('.industry').text()
        past = vcard.search('.past-content').text()
        linkedin_profile_url = 'http://www.linkedin.com/834hj34348'
        
        info = Information.where(:linkedin_url => linkedin_profile_url).first # check if the profile is already in db
        
        if info.nil?
          info = Information.new # create a new object if profile not yet in db
        end 
        info.title = title
        info.region = location
        info.industry = industry
        info.person_id = person.id
        info.past = past
        info.iscurrent = true
        info.save
        
        puts "#{index}. found data for #{person.firstname} #{person.lastname}: #{title}"
      end
      if vcards.size > 1
        return "found #{vcards.size} profiles(s)"
      elsif vcards.size == 1
        return info.title
      end
    rescue SocketError
      return nil
    rescue Timeout::Error
        puts "  caught Timeout::Error !"
        retry
    rescue Mechanize::ResponseCodeError => e
        case e.response_code
          when "502"
            puts "  caught Net::HTTPBadGateway !"
            return "HTTPBadGateway"
          when "404"
            puts "  caught Net::HTTPNotFound for #{person.firstname} #{person.lastname}!"
            return "Not Found"
          else
            puts "  caught Exception !" + e.response_code
            return "Not Exception"
        end
    end
  end
end