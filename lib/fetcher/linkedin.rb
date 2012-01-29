module Fetcher
  class Linkedin
    def fetch(person)
      puts "Fetcher:Linkedin.fetch(#{person.firstname} #{person.lastname})"
      begin
        agent = Mechanize.new
        agent.keep_alive = false
    
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
          # fetch title and linkedin_profile_url
          title = vcard.search('.vcard-basic .title').text()
          linkedin_profile_url = 'http://www.linkedin.com/834hj34348'
          # if linkedin_profile_url found => already_exist = true else false
          info = Information.where(:linkedin_url => linkedin_profile_url).first # check if the profile is already in db
          if info.nil?
            # if already_exist == false then fetch everything and create
            
            location = vcard.search('.location').text()
            industry = vcard.search('.industry').text()
            past = vcard.search('.past-content').text()
            info = Information.new # create a new object if profile not yet in db
            info.title = title
            info.region = location
            info.industry = industry
            info.person_id = person.id
            info.past = past
            info.iscurrent = true
            info.save
            puts "#{index}. found new profile for #{person.firstname} #{person.lastname}: #{title}"

          else
            # if already_exist == true then if info.title != title then update all
            info.old_title = info.title
            info.title = title
            info.region = location
            info.industry = industry
            info.person_id = person.id
            info.past = past
            info.iscurrent = true
            info.save
            puts "#{index}. profile updated for #{person.firstname} #{person.lastname}: new title is: #{title}, old title is #{info.old_title}"
            
          end
        end
        if person.processed == false
          person.processed = true
          person.save
        end
        result = Result.new
        if vcards.size > 1
          result.title = "found #{vcards.size} profiles(s)"
          result.has_profiles = true
          return result
        elsif vcards.size == 1
          result.title = info.title
          result.has_profiles = true 
          return result       
        end
      rescue Net::HTTP::Persistent::Error
        puts "Net::HTTP::Persistent::Error "
        result = Result.new
        result.has_error = true
        result.error_message = "Net::HTTP::Persistent::Error"
        return result
      rescue SocketError
        puts "SocketError"
        result = Result.new
        result.has_error = true
        result.error_message = "SocketError"
        return result
      rescue Timeout::Error
        puts "caught Timeout::Error !"
        result = Result.new
        result.has_error = true
        result.error_message = "Timeout::Error"
        return result
      rescue Mechanize::ResponseCodeError => e
          case e.response_code
            when "502"
              puts "  caught Net::HTTPBadGateway !"
              result = Result.new
              
              result.has_error = true
              result.error_message = "HTTPBadGateway"
              return result
            when "404"
              puts "  caught Net::HTTPNotFound for #{person.firstname} #{person.lastname}!"
              result = Result.new
              
              result.has_error = true
              result.error_message = "Net::HTTPNotFound"
              return result
            else
              puts "caught Exception !" + e.response_code
              result = Result.new
              
              result.has_error = true
              result.error_message = "Exception"
              return result
          end
      end
    end
  end
end