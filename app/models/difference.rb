class Difference < ActiveRecord::Base
  mount_uploader :snapshot, SnapshotUploader
  belongs_to :site
end
