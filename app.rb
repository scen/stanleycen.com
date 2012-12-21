require 'sinatra'
require 'bundler/setup'

Bundler.require :default

Dir["./models/*.rb"].each &method(:require)

helpers do
	def insert_google_analytics
		html << "<script>/*GA*/</script>"
	end
end

get '/' do
	erb :index
end

get '/blog' do
	erb :blog
end

