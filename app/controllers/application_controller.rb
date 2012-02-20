class ApplicationController < ActionController::Base
  protect_from_forgery
  
  # https://gist.github.com/999482
  # We don't want to render the layout if PJAX is working
  def render(options = nil, extra_options = {}, &block)
    if request.headers['X-PJAX'] == 'true'
      options = {} if options.nil?
      options[:layout] = false
    end
    super(options, extra_options, &block)
  end
end
