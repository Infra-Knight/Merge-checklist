class FeaturesController < ApplicationController
  def index
    @features = Feature.all
  end

   def show
    @feature = Feature.find(params[:id])
  end

  def new
    @feature = Feature.new
  end

  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      redirect_to @feature
    else
      render :new
    end
  end

  def edit
    @feature = Feature.find(params[:id])
  end

  def update
    @feature = Feature.find(params[:id])

    if @feature.update(feature_params)
      redirect_to @feature
    else
      render :edit
    end
  end

  def destroy
    @feature = Feature.find(params[:id])
    @feature.destroy

    redirect_to root_path
  end

  private
    def feature_params
      params.require(:feature).permit(:name, :status, :release_date, :description)
    end
end
