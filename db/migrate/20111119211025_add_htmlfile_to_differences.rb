class AddHtmlfileToDifferences < ActiveRecord::Migration
  def change
    add_column :differences, :htmlfile, :string
  end
end
