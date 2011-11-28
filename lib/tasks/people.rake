desc "People"
task :people => :environment do
  agent = Mechanize.new
  
  # get the page and the form
  login_page = agent.get('http://localhost:5000/')
  login_form = login_page.form('user_new')
  
  # fill in fields
  login_form['user[email]'] = 'denis.jacquemin@gmail.com'
  login_form['user[password]'] = 'coraliee'
  
  # submit the form
  agent.submit(login_form, login_form.buttons.first)
  
  # scrapping begins, get the 
  puts agent.page.at('h1')
end
