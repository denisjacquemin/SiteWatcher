module Fetcher
  class Paperjam

    def fetch(person)
      puts "Fetcher:Paperjam.fetch(#{person.firstname} #{person.lastname})"
      begin
        agent = Mechanize.new
        agent.keep_alive = false

        # get google serach results 
        puts "get => http://www.google.lu/search?q=paperjam+#{person.firstname}+#{person.lastname}"
        results_page = agent.get("http://www.google.lu/search?q=paperjam+#{person.firstname}+#{person.lastname}")

        results = agent.page.search('li.g')
        paperjam_info = InfoPaperjam.new
        results.each_with_index do |result, index|
          h3 = result.search('h3').text()
          puts "h3 => #{h3}"
          if h3.include?("#{person.firstname} #{person.lastname}") and h3.include?("paperJam")
            
            # fetch all information
            paperjam_link = result.search('h3 a').attr('href').value
            paperjam_page = agent.get(paperjam_link)
            paperjam_profile_url = agent.current_page.uri.to_s
            
            jobtitle = paperjam_page.search('.surtitle').text().gsub("\n","").strip()
            company  = paperjam_page.search('.heading a').text().gsub("\n","").strip()
            comment  = paperjam_page.search('.reduct-content p').text().gsub("\n","").strip()
            photo_url = paperjam_page.search('.image img[src]').text().gsub("\n","").strip()
            
            profile = Profile.where(:url => paperjam_profile_url).first
            profile = Profile.new(:url => paperjam_profile_url, :person_id => person.id, :profile_type_id => 2) if profile.nil?

            profile.elements << Element.new(:label => 'jobtitle',  :value => jobtitle)
            profile.elements << Element.new(:label => 'company',   :value => company)
            profile.elements << Element.new(:label => 'comment',   :value => comment)
            profile.elements << Element.new(:label => 'photo_url', :value => photo_url)
            profile.save
            
            puts "#{index}. found data on paperjam for #{person.firstname} #{person.lastname}: #{paperjam_info.title }"
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