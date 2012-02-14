class Information < ActiveRecord::Base
  belongs_to :person
  
  # keeps only current profiles
  scope :currents, where( :iscurrent => true )
  scope :by_user, lambda { |user_id| joins(:person).where(:people => { :user_id => user_id}) }  
  
end
