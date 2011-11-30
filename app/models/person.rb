class Person < ActiveRecord::Base
  mount_uploader :csv, PeopleUploader
end
