class Difference < ActiveRecord::Base
  mount_uploader :snapshot, SnapshotUploader
end
