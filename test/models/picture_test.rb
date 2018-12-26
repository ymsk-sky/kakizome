require 'test_helper'

class PictureTest < ActiveSupport::TestCase

  def setup
    @picture = Picture.new(theme: "New Year", name: "User")
  end

  test "should be valid" do
    assert @picture.valid?
  end

  test "theme should be present" do
    @picture.theme = "      "
    assert_not @picture.valid?
  end

  test "name should be present" do
    @picture.name = "      "
    assert_not @picture.valid?
  end

  test "theme should not be too long" do
    @picture.theme = "a" * 21
    assert_not @picture.valid?
  end

  test "name should not be too long" do
    @picture.name = "a" * 21
    assert_not @picture.valid?
  end
end
