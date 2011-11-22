class Site < ActiveRecord::Base
  has_many :snippets
  has_many :differences
  
  scope :by_user, lambda { |user_id| where(:user_id => user_id) }
end
