desc "Generate image"
task :generate_image => :environment do
  
  kit = IMGKit.new('http://localhost:3000/lesoir.be.html', :quality => 50)
  kit.to_file('/Users/denisjacquemin/file.jpg')
end

