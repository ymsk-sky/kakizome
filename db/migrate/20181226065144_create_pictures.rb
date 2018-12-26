class CreatePictures < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.string :theme
      t.string :name
      t.text :canvas_url

      t.timestamps
    end
  end
end
