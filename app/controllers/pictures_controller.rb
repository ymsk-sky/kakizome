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
    @rdm_token = SecureRandom.urlsafe_base64
  end

  def create
    @picture = Picture.new(picture_params)
    if @picture.save
      redirect_to product_path(picture: rdm_token)
    else
      render 'new'
    end
  end

  def index
    @pictures = Picture.paginate(page: params[:page], per_page: 10)
  end

  def product
    @product = Picture.find_by(random_token: rdm_token[:random_token])
  end

  private

    def picture_params
      params.require(:picture).permit(:theme, :name, :canvas_url,
                                                          :random_token)
    end

    def rdm_token
      params.require(:picture).permit(:random_token)
    end
end
