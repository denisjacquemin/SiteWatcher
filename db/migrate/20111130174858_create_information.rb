class CreateInformation < ActiveRecord::Migration
  def change
    create_table :information do |t|
      t.string :title
      t.string :region
      t.string :industry
      t.boolean :iscurrent
      t.string :linkedin_url
      t.text :comment
      t.integer :person_id

      t.timestamps
    end
  end
end
