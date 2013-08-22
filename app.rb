require 'sinatra'
require 'bundler/setup'
require 'time'

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
    case tag.downcase
    when "cpp"
      ret = "cpp"
    else
      ret = tag.downcase
    end
    ret.delete(" ")
  end

  def is_heroku?
    ENV['HEROKU_USER'] != nil
  end

  def get_commit_sha
    return @git.log.first.sha unless is_heroku?
    @commit_sha = @commit_sha or @the_commit.sha
  end

  def get_commit_msg
    return @git.log.first.message unless is_heroku?
    @commit_msg = @commit_msg or @the_commit.commit.message
  end

  def get_commit_time
    return @git.log.first.date unless is_heroku?
    @commit_time = @commit_time or Time.parse(@the_commit.commit.author.date).utc.localtime
  end

  def get_tag_name(tag)
    case tag
    when "csharp"
      'c#'
    else
      tag
    end
  end

  def post_slug_url(slug)
    "/blog/" + slug
  end

  def abbrev_post(source)
    format_post source.split("\n\n").take(3).join("\n\n")
  end
end

before do
  if Sinatra::Base.development?
    Project.clear_projects!
    Post.clear_posts!
    @git = nil
  end
  begin
    @git = @git or Git.open(Dir.pwd) unless is_heroku?
    if is_heroku?
      puts @heroku
      puts (@heroku == nil)
      @heroku = @heroku or Heroku::Client.new(ENV['HEROKU_USER'], ENV['HEROKU_PASS'])
      puts @heroku
      puts "Hello"
      puts "world" + @heroku.to_s
      @last_commit = @last_commit or @heroku.releases("stanleycen").last['commit'] if @heroku
      @the_commit = @the_commit or Octokit.commit('scen/stanleycen.com', @last_commit) if @last_commit
    end
  rescue
  end
end

# Error handling
error Project::NotFound do
  redirect "/"
end

error Post::NotFound do
  redirect "/"
end

get '/' do
  @title = nil
  erb :index
end

get '/blog/?' do
  @posts = Post.all
  @title = "Blog"
  erb :blog
end

get '/blog/:slug/?' do |slug|
  @post = Post.find(slug)
  @title = @post.title
  erb :blog_post
end

get '/projects/?' do
  erb :projects_all
end

get '/project/:slug/?' do |slug|
  @proj = Project.find(slug)
  @title = @proj.title
  erb :project
end

get '/about/?' do
  @title = "About"
  erb :about
end

get '/contact/?' do
  @title = "Contact"
  erb :contact
end

# helpers
get '/main.css' do
  scss :main
end
