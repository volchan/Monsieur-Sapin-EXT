function getFeed() {
  if ($('.website-card').length == 0) {
    $.get("http://monsieursapin.fr/feed", function (xml) {
      var parsedXml = $.parseXML(xml);
		  $(parsedXml).find('item').each(function() {
        var post = $(this);
        $('#website').append('<div class="website-card no-hover"><div class="post-infos"><div class="post-title">' + post.find("title").text() + '</div><div class="post-description">' + post.find("description").text() + '</div></div><a href="' + post.find("link").text() + '" class="post-link"></a></div>');
			  $('.post-description > p:nth-child(2)').remove();
		  });
    });
  }
};
