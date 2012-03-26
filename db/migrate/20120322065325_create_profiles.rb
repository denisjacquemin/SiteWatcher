class CreateProfiles < ActiveRecord::Migration
  def change
    create_table :profiles do |t|
      t.boolean :validated, :default => true
      t.string  :url
      t.integer :profile_type_id
      t.integer :person_id
      
      t.timestamps
    end
  end
end
