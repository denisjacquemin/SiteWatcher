class AddProcessedToPeople < ActiveRecord::Migration
  def change
    add_column :people, :processed, :boolean
  end
end
