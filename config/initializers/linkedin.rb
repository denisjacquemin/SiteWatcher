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
        info.title = title
        info.person_id = person.id
        info.iscurrent = true
        info.save
        puts "#{index}. found data for #{person.firstname} #{person.lastname}: #{title}"
      end
      return info
    rescue SocketError
      return nil
    rescue Timeout::Error
        puts "  caught Timeout::Error !"
        retry
    rescue Mechanize::ResponseCodeError => e
        case e.response_code
          when "502"
            puts "  caught Net::HTTPBadGateway !"
            retry
          when "404"
            puts "  caught Net::HTTPNotFound for #{person.firstname} #{person.lastname}!"
          else
            puts "  caught Excepcion !" + e.response_code
        end
    end
  end
end