class ElementObserver < ActiveRecord::Observer
  def before_update(model)
    # if old and new Value are different then create something, don't know what yet!!
    # Why? because once in a while I have to send an email with the latest changes
    
  end
end
