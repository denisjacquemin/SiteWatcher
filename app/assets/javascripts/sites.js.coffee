# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$("a[rel=twipsy]").twipsy({
live: true
})

$('#compare_it').live('ajax:success', (xhr, data, status) ->
  $('#compare-result').prepend(data.content)
)
