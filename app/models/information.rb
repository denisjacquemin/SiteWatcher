class Information < ActiveRecord::Base
  belongs_to :person
  
  # keeps only current profiles
  scope :currents, where( :iscurrent => true )
  
end
