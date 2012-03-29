class Profile < ActiveRecord::Base
  
  belongs_to  :person
  belongs_to  :profile_type
  has_many    :elements, :dependent => :destroy
  
  scope :linkedin, where(:profile_type_id => 1)
  scope :paperjam, where(:profile_type_id => 2)
  scope :viadeo,   where(:profile_type_id => 3)
  
  
  scope :validated, where(:validated => true)
    
  def element(element_name)
    self.elements.where(:label => element_name).pluck(:value).join(',')
  end
end
