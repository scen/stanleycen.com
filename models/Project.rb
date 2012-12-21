class Project
	class NotFound < StandardError; end

	attr_accessor :name

	def initialize
	end

	def Project.load_projects
		Dir["./projects/*.yml"].inject([]) do |result, file|
			puts "hi"
		end
	end

	def Project.get_projects
		@@all ||= Hash[load_projects.map { |proj| [proj.name, proj] }]
	end

	def Project.clear_projects!
		@@all = nil
	end
end