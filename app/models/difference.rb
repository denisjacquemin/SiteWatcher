class Difference < ActiveRecord::Base
  mount_uploader :snapshot, SnapshotUploader
  mount_uploader :htmlfile, HtmlUploader
  
  belongs_to :site
  belongs_to :old_snippet, :class_name => 'Snippet'
  belongs_to :new_snippet, :class_name => 'Snippet'
  
  scope :by_user, lambda { |user_id| where(:user_id => user_id) }
  scope :by_site, lambda { |site_id| where(:site_id => site_id) }
end


