class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.integer :user_id
      t.integer :person_id
      t.boolean :valid, :default => true
      t.integer :profile_type_id
      
      t.timestamps
    end
  end
end
