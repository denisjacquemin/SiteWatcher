class CreatePaperjams < ActiveRecord::Migration
  def change
    create_table :paperjams do |t|
      t.integer :person_id
      t.string :title
      t.string :company
      t.text :comment
      t.string :photo_url
      t.string :paperjam_profile_url

      t.timestamps
    end
  end
end
