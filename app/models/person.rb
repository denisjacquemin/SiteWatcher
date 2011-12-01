class Person < ActiveRecord::Base
  #mount_uploader :csv, PeopleUploader
  has_many :informations
  def current_title
    
    if self.linkedin_information_id.nil?
      infos = self.informations
      if infos.empty?
        "Not found"
      else
        "found #{infos.count} profile(s)"
      end
    else
      Information.find(self.linkedin_information_id).title
    end    
  end
end
