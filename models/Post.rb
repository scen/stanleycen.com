require 'date'
require 'yaml'
require 'time'

class Post
  class NotFound < StandardError; end

  attr_accessor :title, :slug, :header_img, :content, :created_at
  attr_accessor :cache_css, :cache_abbrev, :cache_full

  def initialize(args = {})
    args.each do |x, y|
      send "#{x}=", y
    end
  end

  def Post.load_posts
    order = YAML.load_file "./posts/order.yml"
    order.reduce([]) do |result, line|
      arr = line.split " "
      slug = arr[0]
      filename = "./posts/#{slug}.md"
      content = File.read(filename).force_encoding "utf-8"

      created_at = Time.parse(arr[1]) || Time.now

      next unless content =~ /\A# (.*)$/

      header_img = nil
      if arr.length >= 3
        header_img = arr[2]
      end

      result << (Post.new slug: slug, title: $1, content: $'.strip, created_at: created_at, header_img: header_img)
    end
  end

  def Post.find(slug)
    all[slug] or raise Post::NotFound
  end

  def Post.all
    @@all ||= Hash[load_posts.map { |post|
      [post.slug, post]
    }]
  end

  def Post.clear_posts!
    @@all = nil
  end
end