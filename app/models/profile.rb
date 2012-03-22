class Profile < ActiveRecord::Base
  belongs_to :user
  belongs_to :person
  
  scope :valid, where( :valid => true )
  
end
