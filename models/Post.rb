# imported posts

require 'date'

class Post
	class NotFound < StandardError; end

	attr_accessor :title, :slug, :content, :created_at

	def initialize(args = {})
		args.each do |x, y|
			send "#{x}=", y
		end
	end

	def Post.load_posts
		order = YAML.load_file "./posts/order.yml"
		order.inject([]) do |result, line|
			arr = line.split " "
			slug = arr.first
			filename = "./posts/#{slug}.md"
      		content = File.read(filename).force_encoding "utf-8"

			created_at = arr.last || Time.now.strftime("%Y-%m-%d")

			next unless content =~ /\A# (.*)$/

			result << (Post.new slug: slug, title: $1, content: $'.strip, created_at: created_at)
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