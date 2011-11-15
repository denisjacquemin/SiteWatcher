# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$("a[rel=twipsy]").twipsy({
live: true,
parentContainer: '#data-pjax-container'
})

$('#compare_it').live('ajax:success', (xhr, data, status) ->
  $('#compare-result').replaceWith('<iframe id="compare-result" width="100%" height="700px" border="0">' + data.content + '</iframe>')
)
