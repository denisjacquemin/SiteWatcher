class CleanPersonColumns < ActiveRecord::Migration
  def up
    remove_column :people, :linkedin_information_id
    remove_column :people, :processed
    remove_column :people, :user_id
  end

  def down
    add_column :people, :linkedin_information_id, :integer
    add_column :people, :user_id, :integer
    add_column :people, :processed, :boolean
  end
  
end
