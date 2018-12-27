class Picture < ApplicationRecord
  validates :theme, presence: true, length: { maximum: 20}
  validates :name, presence: true, length: { maximum: 20}
  validates :picture_canvas_url, presence: true
end
