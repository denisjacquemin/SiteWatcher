class CreateDifferences < ActiveRecord::Migration
  def change
    create_table :differences do |t|
      t.integer :site_id
      t.string :snapshot

      t.timestamps
    end
  end
end
