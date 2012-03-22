class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.boolean :, :default => true
      t.integer :profile_type_id
      t.integer :person_id
      
      t.timestamps
    end
  end
end
