desc "Generate image"
task :generate_image => :environment do
  
  kit = IMGKit.new('http://localhost:5000/uploads/lesoir_local.html', :quality => 50)
  kit.to_file('/Users/denisjacquemin/file.jpg')
end

