class PicturesController < ApplicationController

  def show
    @picture = Picture.find_by_id(params[:id])
    if @picture.nil?
      redirect_to root_path
    else
      redirect_to gallery_path
    end
  end

  def new
    @picture = Picture.new
    @user_theme = params[:user_theme]
    @user_name = params[:user_name]
  end

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      # redirect_to @picture
      redirect_to product_path(picture: picture_params)
    else
      render 'new'
    end
  end

  def index
    @pictures = Picture.paginate(page: params[:page], per_page: 10)
  end

  def product
    # いい感じに呼び出す
    # @product = Picture.last.canvas_url
    @user_theme = picture_params[:theme]
    @user_name = picture_params[:name]
    @product = picture_params[:canvas_url]
  end

  private

    def picture_params
      params.require(:picture).permit(:theme, :name, :canvas_url)
    end
end
