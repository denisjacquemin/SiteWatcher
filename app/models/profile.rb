class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :person
  belongs_to :profile_type
  
  scope :valid, where( :valid => true )
  
end
