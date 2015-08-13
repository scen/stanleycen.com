require 'rouge/plugins/redcarpet'

class MarkdownService
  class Renderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet
  end

  attr_reader :markdown

  def self.call(markdown)
    new(markdown).call
  end

  def initialize(markdown)
    @markdown = markdown
  end

  def call
    render
  end

  private

  def markdown_renderer
    Redcarpet::Markdown.new(Renderer, autolink: true, tables: true, fenced_code_blocks: true, disable_indented_code_blocks: true, strikethrough: true, no_intra_emphasis: true, superscript: true, quote: true)
  end

  def render
    markdown_renderer.render(markdown)
  end
end