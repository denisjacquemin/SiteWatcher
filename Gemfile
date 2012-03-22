source 'http://rubygems.org'

gem 'rails', '3.2.1'

# Bundle edge Rails instead:
# gem 'rails',     :git => 'git://github.com/rails/rails.git'

group :production do
  gem 'pg'
end
group :development, :test do
  gem 'sqlite3'
  gem "daemons"
end

gem 'nokogiri'
gem 'htmldiff'
gem "imgkit", "~> 1.3.2"
gem  'devise'

gem 'twitter-bootstrap-rails', '~> 1.4.3'
gem 'carrierwave'
gem 'fog'
gem 'thin'
gem 'pjax_rails'
gem 'mechanize'
gem 'kaminari'
gem 'delayed_job_active_record'
gem "delayed_job_web"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', :require => false
end
