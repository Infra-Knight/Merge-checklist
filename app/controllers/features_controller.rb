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

  def status_width_for_progress_bar(feature)
    possible_status = { "To Do" => "0", "In Progress" => "33", "In Review" => "66", "Merged" => "100" }
    possible_status[feature.status]
  end

  def status_color_for_progress_bar(feature)
    possible_status = { "To Do" => "", "In Progress" => "bg-info", "In Review" => "bg-primary", "Merged" => "bg-success" }
    possible_status[feature.status]
  end

  helper_method :status_width_for_progress_bar
  helper_method :status_color_for_progress_bar

  private
    def feature_params
      params.require(:feature).permit(:name, :status, :release_date, :description)
    end
end
