#!/usr/bin/env ruby

# An extremely shitty build script.
# Builds stanleycen.com into a static site, placing files into the scen.github.io folder.

require './app'
Dir["./models/*.rb"].each &method(:require)

require 'find'
require "rack/test"
require "htmlcompressor"
require 'uglifier'
require 'git'


TOP_ROUTES = ['/', '/blog', '/projects']

OUTPUT_DIR = 'scen.github.io/'

CNAME = "stanleycen.com"

class Builder
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def get_dir(d)
    OUTPUT_DIR + d + '/'
  end

  def get_index(d)
    d + 'index.html'
  end

  def mkdir(d)
    Dir.mkdir(d) unless Dir.exists?(d)
  end

  def clean
    Dir.chdir(OUTPUT_DIR)
    puts Dir.pwd
    puts `find . -path ./.git -prune -o -exec rm -rf {} \\; 2> /dev/null`
    Dir.chdir('..')
    puts Dir.pwd
  end

  def build
    compressor = HtmlCompressor::Compressor.new

    # Top level routes.
    puts "Top level"
    TOP_ROUTES.each do |route|
      res = get(route)
      raise "Non 200 response" if res.status != 200
      folder_base = route.gsub!('/', '')
      d = get_dir(folder_base)
      mkdir(d)
      index = get_index(d)
      File.open(index, 'w+') do |f|
        f.write(compressor.compress(res.body))
      end
    end

    # Blog.
    puts "Blog"
    Post.all.each do |slug, post|
      dd = 'blog/' + slug
      d = get_dir(dd)
      mkdir(d)
      res = get(dd)
      raise "Non 200 response" if res.status != 200
      File.open(get_index(d), 'w+') do |f|
        f.write compressor.compress res.body
      end
    end

    # Projects.
    puts "Projects"
    mkdir(get_dir('project'))
    Project.all.each do |slug, proj|
      dd = 'project/' + slug
      d = get_dir(dd)
      mkdir(d)
      res = get(dd)
      raise "Non 200 response" if res.status != 200
      File.open(get_index(d), 'w+') do |f|
        f.write compressor.compress res.body
      end
    end

    # CSS.
    puts "CSS"
    css_res = get('/main.css')
    raise "Non 200 response" if css_res.status != 200
    File.open(OUTPUT_DIR + "main.css", 'w+') do |f|
        f.write(css_res.body)
    end

    # Static files.
    puts "Static files"
    FileUtils.cp_r('public/.', OUTPUT_DIR)

    # Minify JS.
    puts "Minify JS"
    Find.find(OUTPUT_DIR) do |path|
      if path =~ /.*\.js$/
        contents = File.read(path)
        File.open(path, 'w+') do |f|
          f.write Uglifier.new(:mangle => false).compile contents
        end
      end
    end

    # CNAME.
    puts "CNAME"
    File.open(OUTPUT_DIR + "CNAME", 'w+') do |f|
      f.write CNAME
    end
  end

  def make_all
    clean
    build
  end
end

git = Git.open(OUTPUT_DIR)

case ARGV[0]
when 'build'
  puts "Building..."
  builder = Builder.new
  builder.make_all

when 'commit'
  puts "Committing..."
  git.add(:all => true)
  git.commit('Static build committed on ' + Time.new.to_s)

when 'deploy'
  puts "Deploying..."
  git.push

else
  puts "Command not recognized."
end