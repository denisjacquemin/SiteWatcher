class AddSnippetIdsToDifferences < ActiveRecord::Migration
  def change
    add_column :differences, :old_snippet_id, :integer
    add_column :differences, :new_snippet_id, :integer
  end
end
