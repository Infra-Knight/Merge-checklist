#!/usr/bin/env ruby

module Api
  module V1
    class FeaturesController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        features = Feature.all
        render json: FeatureSerializer.new(features, options).serialized_json
      end

      def show
        feature = Feature.find(params[:id])

        render json: FeatureSerializer.new(feature, options).serialized_json
      end

      def create
        feature = Feature.new(feature_params)

        if feature.save
          render json: FeatureSerializer.new(feature).serialized_json
        else
          render json: { error: feature.errors.messages }, status: 422
        end
      end

      def update
        feature = Feature.find(params[:id])

        if feature.update(feature_params)
          render json: FeatureSerializer.new(feature, options).serialized_json
        else
          render json: { error: feature.errors.messages }, status: 422
        end
      end

      def destroy
        feature = Feature.find(params[:id])
        if feature.destroy
          head :no_content
        else
          render json: { error: feature.errors.messages }, status: 422
        end
      end

      private

      def feature_params
        params.require(:feature).permit(:name, :status, :release_date, :description)
      end

      def options
        @options ||= { include: %i[check_items] }
      end
    end
  end
end
