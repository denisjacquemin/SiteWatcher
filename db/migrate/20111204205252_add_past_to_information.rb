class AddPastToInformation < ActiveRecord::Migration
  def change
    add_column :information, :past, :string
  end
end
