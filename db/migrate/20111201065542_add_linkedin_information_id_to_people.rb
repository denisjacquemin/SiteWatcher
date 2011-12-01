class AddLinkedinInformationIdToPeople < ActiveRecord::Migration
  def change
    add_column :people, :linkedin_information_id, :integer
  end
end
