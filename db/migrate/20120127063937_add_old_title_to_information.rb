class AddOldTitleToInformation < ActiveRecord::Migration
  def change
    add_column :information, :old_title, :string
  end
end
