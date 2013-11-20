require 'sinatra'
require 'bundler/setup'
require 'time'
require 'rubygems'
require 'mail'

Bundler.require :default

Dir["./models/*.rb"].each &method(:require)

DEFAULT_WIDTH = 300
CLOUDINARY_BASE = 'http://res.cloudinary.com/hazdcamql/image/upload/'
GREETINGS = ['Hey there!', 'Hello there!', 'Hi there!']

helpers do 
  def format_post(source)
    source = (source.split("<!--more-->").map { |s| s.strip }.join("\n") || source).strip
    html = markdown source.gsub(/^    \\[a-z]+\s*\n(    .*(\n|$))*/) { |snippet|
      lang, *source = snippet.lines.to_a
      Pygments.highlight source.map { |x| x[4..-1] }.join("\n"), lexer: lang[5..-1].strip, options: { encoding: "utf-8" }
    }
    noko = Nokogiri::HTML.fragment(html)
    noko.css('photo').each do |photo|
      if photo.attribute('cloudinary')
        img_name = photo.attribute('src')
        title = photo.text || ""
        width = photo.attribute('width') || DEFAULT_WIDTH
        height = photo.attribute('height')
        noresize = photo.attribute('noresize')
        nolightbox = photo.attribute('nolightbox')

        caption = Nokogiri::XML::Node.new 'div', noko
        caption['class'] = 'caption'

        span = Nokogiri::XML::Node.new 'span', noko
        span.content = title
        caption << span unless title == ''

        div = Nokogiri::XML::Node.new 'div', noko
        div['class'] = 'center hover expand photo'

        a = Nokogiri::XML::Node.new 'a', noko
        a['class'] = 'lightbox' + (nolightbox ? '' : ' popout-lightbox')
        a['href'] = CLOUDINARY_BASE + img_name
        a['title'] = title
        a['target'] = '_blank'
        
        img = Nokogiri::XML::Node.new 'img', noko
        if false and !noresize
          # img['src'] = CLOUDINARY_BASE + 'c_thumb,w_' + width.to_s + '/' + img_name
        else
          img['src'] = CLOUDINARY_BASE + img_name
        end
        img['alt'] = title
        div['style'] = ('max-width: ' + width.to_s + 'px') unless noresize
        img['style'] = ('max-width: 100%') unless noresize
        
        a << img
        div << a
        div << caption unless title == ''
        photo.replace div
      else
        raise NotImplementedError
      end
    end
    noko.to_html
  end

  def get_nav_classes(nav)
    nav + (nav == @nav ? ' selected' : '')
  end

  def get_tag_class(tag)
    case tag.downcase
    when "c++"
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
    return $git.log.first.sha unless is_heroku?
    $commit_sha ||= $the_commit.sha
  end

  def get_commit_msg
    return $git.log.first.message unless is_heroku?
    $commit_msg ||= $the_commit.commit.message
  end

  def get_commit_time
    return $git.log.first.date unless is_heroku?
    $commit_time ||= Time.parse($the_commit.commit.author.date).utc.localtime
  end

  def nav_url(nav, title)
    case nav
    when 'home'
      '#' + title
    when title
      '/' + title
    else
      '/#' + title
    end
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
    format_post (source.split("<!--more-->").first || source).strip
  end
end

before do
  if Sinatra::Base.development?
    Project.clear_projects!
    Post.clear_posts!
    $git = nil
  end
  begin
    $git ||= Git.open(Dir.pwd) unless is_heroku?
    if is_heroku?
      $heroku ||= Heroku::Client.new(ENV['HEROKU_USER'], ENV['HEROKU_PASS'])
      $last_commit ||= $heroku.releases("stanleycen").last['commit'] if $heroku
      $the_commit ||= Octokit.commit('scen/stanleycen.com', $last_commit) if $last_commit
    end
  rescue
  end
end

Mail.defaults do
  delivery_method :smtp, {
    :address => 'smtp.sendgrid.net',
    :port => '587',
    :domain => 'heroku.com',
    :user_name => ENV['SENDGRID_USERNAME'],
    :password => ENV['SENDGRID_PASSWORD'],
    :authentication => :plain,
    :enable_starttls_auto => true
  }
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
  @nav = "home"
  erb :index
end

get '/blog/?' do
  @posts = Post.all
  @title = "Blog"
  @nav = "blog"
  erb :blog
end

get '/blog/:slug/?' do |slug|
  @post = Post.find(slug)
  @title = @post.title
  @nav = "blog"
  erb :blog_post
end

get '/projects/?' do
  @nav = "projects"
  @title = "Projects"
  erb :projects_all
end

get '/project/:slug/?' do |slug|
  @proj = Project.find(slug)
  @title = @proj.title
  @nav = "projects"
  erb :project
end

get '/about/?' do
  redirect '/#about'
end

get '/contact/?' do
  redirect '/#contact'
end

post '/contact' do
  puts params
  froms = params[:name] + ' <' + params[:email] + '>'
  subjs = params[:subject]
  bodys = params[:message]
  Mail.deliver do
    to 'me@stanleycen.com'
    from froms
    subject subjs
    body bodys
  end
  "error"
end

# helpers
get '/main.css' do
  scss :main
end
