class StaticPagesController < ApplicationController
  def top
  end

  def contact
  end

  def theme
    @user_theme = params[:user_theme]
    @user_name = params[:user_name]
  end
end
