class Person < ActiveRecord::Base
  #mount_uploader :csv, PeopleUploader
  has_many :informations
  has_many :paperjams

  def current_title
    
      infos = self.informations
      if infos.empty?
        ""
      elsif infos.size == 1
        infos[0].title
      else
        "found #{infos.count} profile(s)"
      end
  end
  
  scope :by_user, lambda { |user_id| where(:user_id => user_id) }  
  
end
