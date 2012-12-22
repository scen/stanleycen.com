require 'sinatra'
require 'bundler/setup'

Bundler.require :default

Dir["./models/*.rb"].each &method(:require)

helpers do
	def format_post(source)
    	markdown source.gsub(/^    \\[a-z]+\s*\n(    .*(\n|$))*/) { |snippet|
    		lang, *source = snippet.lines.to_a
    		Pygments.highlight source.map { |x| x[4..-1] }.join("\n"), lexer: lang[5..-1].strip, options: { encoding: "utf-8" }
   		}
	end

	def get_tag_class(tag)
		tag.downcase == "c++" ? "cpp" : tag.delete(" ")
	end

	def post_slug_url(slug)
		"/blog/" + slug
	end

	def abbrev_post(source)
		format_post source.split("\n\n").take(3).join("\n\n")
	end
end

before do
	if development?
		Project.clear_projects!
		Post.clear_posts!
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
	@posts = Post.all
	erb :blog
end

get '/blog/:slug' do |slug|
	@post = Post.find slug
	@title = @post.title
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


