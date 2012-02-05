class AddValidatedToInformation < ActiveRecord::Migration
  def change
    add_column :information, :validated, :boolean

  end
end
