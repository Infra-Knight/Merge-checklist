#!/usr/bin/env ruby

module Api
  module V1
    class CheckItemsController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        feature = Feature.find(params[:feature_id])
        # check_items = feature.check_items.find(params[:id])
        render json: CheckItemSerializer.new(feature.check_items).serialized_json
      end

      def create
        feature = Feature.find(params[:feature_id])
        check_item = feature.check_items.create(check_item_params)
        render json: CheckItemSerializer.new(check_item).serialized_json
      end

      def update
        feature = Feature.find(params[:feature_id])
        check_item = feature.check_items.find(params[:id])

        if check_item.update(check_item_params)
          render json: CheckItemSerializer.new(check_item).serialized_json
        else
          render json: { error: check_item.errors.messages }, status: 422
        end
      end

      def destroy
        feature = Feature.find(params[:feature_id])
        check_item = feature.check_items.find(params[:id])
        if check_item.destroy
          head :no_content
        else
          render json: { error: check_item.errors.messages }, status: 422
        end
      end

      private

      def check_item_params
        params.require(:check_item).permit(:description, :finished)
      end
    end
  end
end
