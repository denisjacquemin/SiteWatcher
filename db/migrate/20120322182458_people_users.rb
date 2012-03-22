class PeopleUsers < ActiveRecord::Migration
  def change
    create_table :people_users, :id => false do |t|
      t.integer :person_id
      t.integer  :user_id
    end
  end
end
