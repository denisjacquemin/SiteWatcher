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
            paperjam_link = result.search('h3 a').attr('href').value
            puts "link => #{paperjam_link}"
            paperjam_page = agent.get(paperjam_link)  
            paperjam_info.person_id = person.id
            paperjam_info.title = paperjam_page.search('.surtitle').text().gsub("\n","").strip()
            paperjam_info.company = paperjam_page.search('.heading a').text().gsub("\n","").strip()
            paperjam_info.comment = paperjam_page.search('.reduct-content p').text().gsub("\n","").strip()
            paperjam_info.photo_url = paperjam_page.search('.image img[src]')
            paperjam_info.paperjam_profile_url=paperjam_link
            paperjam_info.save
            puts "#{index}. found data on paperjam for #{person.firstname} #{person.lastname}: #{paperjam_info.title }"
            break
          end
        end
        result = Result.new
        if paperjam_info.nil? or paperjam_info.id.nil?
          result.has_error = true
          result.error_message = "not found"
          return result
        else
          result.title = paperjam_info.title
          result.has_profiles = true 
          return result
        end
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