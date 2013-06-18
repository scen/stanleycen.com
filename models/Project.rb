require 'yaml'

class Project
  class NotFound < StandardError; end

  attr_accessor :title, :slug, :tags, :summary, :content, :repo

  def initialize(args = {})
    args.each do |x, y|
      send "#{x}=", y
    end
  end

  def Project.load_projects
    order = YAML.load_file "./projects/order.yml"
    order.reduce([]) do |result, file|
      data = YAML.load_file("./projects/" + file + ".yml")

      title = data['title']
      tags = data['tags'].reduce([]) do |result, tag|
        result << tag
      end unless data['tags'].nil?

      summary = data['summary']
      content = data['content']
      slug = data['slug']
      repo = data['repo']

      result << (Project.new title: title, tags: tags, summary: summary, content: content, slug: slug, repo: repo)
    end
  end

  def Project.find(slug)
    all[slug] or raise Project::NotFound
  end

  def Project.all
    @@all ||= Hash[load_projects.map { |proj|
      [proj.slug, proj]
    }]
  end

  def Project.clear_projects!
    @@all = nil
  end
end