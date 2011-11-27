# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$("*[rel=twipsy]").twipsy({
live: true,
parentContainer: '#data-pjax-container'
})

$('#compare_it').live('ajax:success', (xhr, data, status) ->
  $('#compare-result').replaceWith('<iframe id="compare-result" width="100%" height="700px" border="0">' + data.content + '</iframe>')
)

$('#difference-form').live('ajax:success', (xhr, data, status) ->
    displayDifferenceDetails(data)
)

displayDifferenceDetails = (data) ->
  $('#difference-details').replaceWith('<div id="difference-details">
                                          <div><a href="' + data.htmlfile_url + '" target="_blank">html difference</a></div>
                                          <div><img id="snapshot" src="' + data.snapshot_url + '" /></div>
                                          <div>Created at: ' + data.created_at + '</div>
                                        </div>')
                                        

  if $('ul#pending-invitations').size() == 0
    $('<h4>Pending Invitations</h4><ul id="pending-invitations"></ul><div class="clear"></div>').insertAfter('#new_invitation').insertAfter
  $('ul#pending-invitations').prepend('<li><span class="left">'+data.email+'</span><span class="right">' + data.created_at + '</span></li>') ## highlight!
