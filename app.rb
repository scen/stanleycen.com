require 'sinatra'
require 'bundler/setup'

Bundler.require :default

Dir["./models/*.rb"].each &method(:require)

helpers do
	def insert_google_analytics
	end
end

before do
	if development?
		Project.clear_projects!
	end
end

get '/' do
	erb :index
end

get '/blog' do
	erb :blog
end

get '/blog/:url' do
	erb :blog_post
end

get '/projects' do
	erb :projects_all
end

get '/projects/:name' do
	erb :projects
end

get '/about' do
	erb :about
end

get '/contact' do
	erb :contact
end

# helpers
get '/main.css' do
	scss :main
end


