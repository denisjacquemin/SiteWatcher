class AddAlertSentToDifferences < ActiveRecord::Migration
  def change
    add_column :differences, :alert_sent, :boolean, :default => false
  end
end
