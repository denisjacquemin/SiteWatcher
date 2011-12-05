# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/


$('.refresh').ajaxStart(() -> 
  $(this).hide() 
  $(this).prev('img').show()
)


$('.refresh').ajaxStop(() -> 
  $(this).show() 
  $(this).prev('img').hide()
)
