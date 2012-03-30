module Fetcher
  class Viadeo

    def fetch(person)
      puts "Fetcher:Viadeo.fetch(#{person.firstname} #{person.lastname})"
      begin
        agent = Mechanize.new
        agent.keep_alive = false

        # get google serach results 
        puts "get => http://www.google.lu/search?q=viadeo+#{person.firstname}+#{person.lastname}"
        results_page = agent.get("http://www.google.lu/search?q=viadeo+#{person.firstname}+#{person.lastname}")

        results = agent.page.search('li.g')
        results.each_with_index do |result, index|
          h3 = result.search('h3').text()
          puts "h3 => #{h3}"
          if h3.include?("#{person.firstname} #{person.lastname}") and h3.include?("- Viadeo")
            
            # fetch all information
            viadeo_link = result.search('h3 a').attr('href').value
            viadeo_page = agent.get(viadeo_link)
            viadeo_profile_url = agent.current_page.uri.to_s
            
            jobtitle = viadeo_page.search('.headline.title').text().gsub("\n","").strip()
            location = viadeo_page.search('.locality').text().gsub("\n","").strip()
            
            profile = Profile.where(:url => viadeo_profile_url).first
            profile = Profile.new(:url => viadeo_profile_url, :person_id => person.id, :profile_type_id => 3) if profile.nil?

            profile.elements << Element.new(:label => 'jobtitle',  :value => jobtitle)
            profile.elements << Element.new(:label => 'location',   :value => location)
            profile.save
            break
          end
        end
      rescue SocketError
        puts "SocketError for #{person.firstname} #{person.lastname}!"
      rescue Timeout::Error
          puts "caught Timeout::Error for #{person.firstname} #{person.lastname}!"
      rescue Mechanize::ResponseCodeError => e
          case e.response_code
            when "502 for #{person.firstname} #{person.lastname}!"
              puts "  caught Net::HTTPBadGateway for #{person.firstname} #{person.lastname}!"
            when "404"
              puts "  caught Net::HTTPNotFound for #{person.firstname} #{person.lastname}!"
            else
              puts "caught Exception for #{person.firstname} #{person.lastname}! " + e.response_code
          end
      end
    end
  end
end