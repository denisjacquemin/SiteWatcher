class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :firstname
      t.string :lastname
      t.string :linkedinid
      t.string :jobtitle
      t.string :company

      t.timestamps
    end
  end
end
