class Site < ActiveRecord::Base
  has_many :snippets
  has_many :differences
end
