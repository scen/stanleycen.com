# imported posts

require 'date'

class Post
	class NotFound < StandardError; end

	attr_accessor :title, :slug, :tags, :summary, :content, :repo

	def initialize(args = {})
		args.each do |x, y|
			send "#{x}=", y
		end
	end

	def Post.load_posts
		order = YAML.load_file "./posts/order.yml"
		order.inject([]) do |result, line|
			slug = line.first
			filename = "./posts/#{slug}.md"
      		content = File.read(filename).force_encoding "utf-8"

			the_date = line.last || Time.now.strftime("%Y-%m-%d")
			title = data['title']
			
			# tags = data['tags'].inject([]) do |result, tag|
			# 	result << tag
			# end unless data['tags'].nil?

			summary = data['summary']
			content = data['content']
			slug = data['slug']
			repo = data['repo']

			result << (Post.new title: title, tags: tags, summary: summary, content: content, slug: slug, repo: repo)
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