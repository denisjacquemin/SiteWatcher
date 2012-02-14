class InfoPaperjam < ActiveRecord::Base
  belongs_to :person
  
  scope :by_user, lambda { |user_id| joins(:person).where(:people => { :user_id => user_id}) }  
  
end
