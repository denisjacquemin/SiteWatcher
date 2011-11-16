class Snippet < ActiveRecord::Base
  belongs_to :site
  has_many :differences
end
