class ChangeTypeOfPastInInformation < ActiveRecord::Migration
  def up
    remove_column :information, :past
    add_column :information, :past, :text
  end

  def down
    remove_column :information, :past
    add_column :information, :past, :string
  end
end
