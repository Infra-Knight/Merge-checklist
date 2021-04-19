class DropChecklistTable < ActiveRecord::Migration[6.1]
  def up
    drop_table :checklists
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
