class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.string    :label
      t.text      :value
      t.integer   :profile_id

      t.timestamps
    end
  end
end
