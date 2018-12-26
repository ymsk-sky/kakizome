require 'test_helper'

class PicturesControllerTest < ActionDispatch::IntegrationTest
  test "should get theme" do
    get theme_path
    assert_response :success
  end

  test "should get writing" do
    get writing_path
    assert_response :success
  end

  test "should get product" do
    get product_path
    assert_response :success
  end

  test "should get gallery" do
    get gallery_path
    assert_response :success
  end

end
