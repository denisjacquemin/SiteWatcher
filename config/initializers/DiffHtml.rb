class DiffHtml
  #<%= raw DiffHtml.diff(Snippet.find(6).content, Snippet.find(7).content) %>
  
  extend HTMLDiff
end