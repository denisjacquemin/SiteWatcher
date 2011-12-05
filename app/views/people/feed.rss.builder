xml.instruct! xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "People"
    xml.description "#{current.user.email} people"
    xml.link people_url
    for person in @people
      xml.item do
        xml.title "#{person.firstname} #{person.lastname} update detected"
        xml.description "contenu de l'update ici"
        xml.pubDate person.updated_at.to_s(:rfc822)
        xml.link "#"
        xml.guid "#"
      end
    end
  end
end