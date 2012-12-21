# imported posts

require 'date'

class Post
	class NotFound < StandardError
	end

	def initialize
	end



	def Post.all
		@@all_posts ||= nil
	end

end