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
        paperjam_info = Paperjam.new
        results.each_with_index do |result, index|
          h3 = result.search('h3').text()
          puts "h3 => #{h3}"
          if h3.include?("#{person.firstname} #{person.lastname}") and h3.include?("paperJam")
            paperjam_link = result.search('h3 a').attr('href').value
            puts "link => #{paperjam_link}"
            paperjam_page = agent.get(paperjam_link)  
            paperjam_info.person_id = person.id
            paperjam_info.title = paperjam_page.search('.surtitle').text()
            paperjam_info.company = paperjam_page.search('.heading a').text()
            paperjam_info.comment = paperjam_page.search('.reduct-content p').text()
            paperjam_info.photo_url = paperjam_page.search('.image img[src]')
            paperjam_info.paperjam_profile_url=paperjam_link
            paperjam_info.save
            puts "#{index}. found data on paperjam for #{person.firstname} #{person.lastname}: #{paperjam_info.title }"
            break
          end
        end
        if paperjam_info.nil?
          return "Not found"
        else
          return "found"
        end
      rescue SocketError
        puts "SocketError"
        return "Connection Error"
      rescue Timeout::Error
          puts "  caught Timeout::Error !"
          return "Timout Error"
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
end