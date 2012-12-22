require 'sinatra'
require 'bundler/setup'

Bundler.require :default

Dir["./models/*.rb"].each &method(:require)

helpers do
	def insert_google_analytics
	end
	def format_post(source)
    	markdown source.gsub(/^    \\[a-z]+\s*\n(    .*(\n|$))*/) { |snippet|
    		lang, *source = snippet.lines.to_a
    		Pygments.highlight source.map { |x| x[4..-1] }.join("\n"), lexer: lang[5..-1].strip, options: { encoding: "utf-8" }
   		}
  end
end

before do
	if development?
		Project.clear_projects!
	end
end

# Error handling
error Project::NotFound do
	redirect "/"
end

get '/' do
	erb :index
end

get '/blog/?' do
	erb :blog
end

get '/blog/:url' do
	erb :blog_post
end

get '/projects/?' do
	erb :projects_all
end

get '/project/:slug' do |slug|
	@proj = Project.find(slug)
	erb :project
end

get '/about/?' do
	erb :about
end

get '/contact/?' do
	erb :contact
end

# helpers
get '/main.css' do
	scss :main
end


