class CreateProfileUpdates < ActiveRecord::Migration
  def change
    create_table :profile_updates do |t|
      t.integer :profile_id
      t.text :old_value
      t.text :new_value

      t.timestamps
    end
  end
end
