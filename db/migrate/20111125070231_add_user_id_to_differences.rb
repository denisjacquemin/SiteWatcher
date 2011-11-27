class AddUserIdToDifferences < ActiveRecord::Migration
  def change
    add_column :differences, :user_id, :integer
  end
end
