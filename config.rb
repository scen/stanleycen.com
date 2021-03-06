require 'git'
require 'tzinfo'
require 'set'
require 'RMagick'
Time.zone = 'US/Pacific'

set :markdown_engine, :redcarpet
set :markdown, :fenced_code_blocks => true, :smartypants => true

# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :blog do |blog|
  blog.name = "blog"
  blog.prefix = "blog"
  blog.layout = "post"
  blog.permalink = "{year}/{title}.html"
  blog.default_extension = ".markdown.erb"
end

activate :blog do |blog|
  blog.name = "hikes"
  blog.prefix = "hike"
  blog.layout = "hike"
  blog.sources = "{year}/{month}-{day}-{title}.html"
  blog.permalink = "{year}/{title}.html"
  blog.default_extension = ".markdown.erb"
  blog.new_article_template = File.expand_path('source/hike/template.markdown.erb', File.dirname(__FILE__))
end

activate :directory_indexes
activate :syntax
activate :minify_html do |html|
  html.remove_input_attributes = false
end


# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page '/path/to/file.html', layout: 'other_layout'

# Proxy pages
# https://middlemanapp.com/advanced/dynamic-pages/

# proxy(
#   '/this-page-has-no-template.html',
#   '/template-file.html',
#   locals: {
#     which_fake_page: 'Rendering a fake page with a local variable'
#   },
# )

# Redirects
redirect "blog/mac-osx-code-injection/index.html", to: "/blog/2013/mac-osx-code-injection/"
redirect "blog/directx11-hooking/index.html", to: "/blog/2012/directx11-hooking/"

# Helpers
# Methods defined in the helpers block are available in templates
# https://middlemanapp.com/basics/helper-methods/

$git = Git.open(Dir.pwd)
$markdown_renderer = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true)
$image_resize_cache = {}

helpers do
  def get_nav_classes nav
    nav
  end

  def get_commit_sha
    return $git.log.first.sha
  end

  def get_commit_msg
    return $git.log.first.message
  end

  def get_commit_time
    return $git.log.first.date
  end

  # resolve relative urls from articles via a hacky global $current_article
  def url url
    if !url.start_with?('/') && $current_article
      return url_for($current_article.path) + url
    else
      return url_for(url)
    end
  end

  def img(path, caption, args={})
    partial(:image, :locals => { :src => url(path), :caption => caption }.merge(args))
  end

  def image(args)
    partial(:image, :locals => args)
  end

  def get_header_image current_page
    if current_page.data.header_img
      return url_for current_page.data.header_img
    else current_page.path.start_with?('')
      return '/img/default_blog_header.jpg'
    end
  end

  def get_hike_title hike
    prefix = ''
    if !hike.data[:park].nil?
      prefix = hike.data[:park]
    elsif !hike.data[:area].nil?
      prefix = hike.data[:area]
    end

    if not prefix.empty?
      prefix = prefix + ": "
    end
    return prefix + hike.title
  end

  def render_hike_info hike
    partial(:hike_info, :locals => {:hike => hike})
  end

  def render_hike_date hike
    str = hike.date.strftime("%B %d, %Y")
    if hike.data.key?('end_date') && hike.data.end_date
      str += " &mdash; " + hike.data.end_date.strftime("%B %d, %Y")
    elsif hike.data.key?('extra_dates') && hike.data.extra_dates
      e = hike.data.extra_dates
      e.each do |date|
        str += " + " + date.strftime("%B %d, %Y")
      end
    end
    return str
  end

  def hike_maybe_show_row(name, value, unit="")
    if !unit.blank?
        unit = ' ' + unit
    end
    if !value.blank?
      return partial(:hike_info_row, :locals => {:name => name, :data => value.to_s + unit})
    end
    return ""
  end

  def markdown_to_html md
    return "" if md.nil?
    $markdown_renderer.render(md)
  end

  def resize_image(dest_path, geometry_str="500x")
    return dest_path if geometry_str.empty?
    res = sitemap.find_resource_by_destination_path(dest_path)
    path = app.source_dir + res.path
    ext = path.extname
    image = Magick::Image.read(path).first
    image.change_geometry!(geometry_str) { |cols, rows, img|
      img.resize!(cols, rows)
      img.sharpen(0.5, 0.5)
    }
    new_path = path.sub_ext('').to_s + '.' + geometry_str + ext
    image.write(new_path) { self.quality = 100 }
  end
end

# Build-specific configuration
# https://middlemanapp.com/advanced/configuration/#environment-specific-settings

configure :build do
  activate :minify_css
  activate :minify_javascript
end

after_build do |builder|
  FileUtils.cp_r 'source/googlec302829953b8e462.html', 'docs/'
end