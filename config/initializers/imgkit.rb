IMGKit.configure do |config|
  config.wkhtmltoimage = Rails.root.join('bin', 'wkhtmltoimage-amd64').to_s if ENV['Rails.env'] == 'production'
end