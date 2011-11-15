class AddEmailToSites < ActiveRecord::Migration
  def change
    add_column :sites, :email, :string
  end
end
