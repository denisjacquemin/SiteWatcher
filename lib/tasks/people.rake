desc "Test People"
task :test_people => :environment do
  agent = Mechanize.new
  
  # get the page and the form
  login_page = agent.get('http://localhost:5000/')
  login_form = login_page.form('user_new')
  
  # fill in fields
  login_form['user[email]'] = 'denis.jacquemin@gmail.com'
  login_form['user[password]'] = 'coraliee'
  
  # submit the form
  agent.submit(login_form, login_form.buttons.first)
  
  # scrapping begins, get the h1
  puts agent.page.at('h1')
end

desc "People"
task :people => :environment do
  agent = Mechanize.new
  
  Person.all.each do |person|
    
    puts "### #{person.firstname} #{person.lastname}"
    
    # get linkedin homepage
    home_page = agent.get('http://www.linkedin.com/')
    
    # get search form
    search_form = home_page.form('searchForm')
  
    # fill in fields
    search_form['first'] = person.firstname
    search_form['last'] = person.lastname
  
    # submit the form
    begin
      sleep(10)
      agent.submit(search_form, search_form.buttons.first)
      vcards = agent.page.search('.vcard')
      vcards.each_with_index do |vcard, index|
        title = vcard.search('.vcard-basic .title').text()
        info = Information.new
        info.title = title
        info.person_id = person.id
        info.iscurrent = true
        info.save
        puts "#{index}. found data for #{person.firstname} #{person.lastname}: #{title}"
      end
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