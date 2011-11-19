class Difference < ActiveRecord::Base
  mount_uploader :snapshot, SnapshotUploader
  mount_uploader :html, HtmlUploader
  
  belongs_to :site
  belongs_to :old_snippet, :class_name => 'Snippet'
  belongs_to :new_snippet, :class_name => 'Snippet'
end

