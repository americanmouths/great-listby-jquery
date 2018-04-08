class CreateBookFeatures < ActiveRecord::Migration[5.1]
  def change
    create_table :book_features do |t|
      t.integer :book_id
      t.integer :book_list_id
      t.string :status
    end
  end
end
