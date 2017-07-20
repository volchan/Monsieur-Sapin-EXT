function getFeed() {
  if ($('.website-card').length == 0) {
    $.get("http://monsieursapin.fr/feed", function (xml) {
      $(xml).find('item').each(function() {
        var post = $(this);
        $('#website').append('<div class="website-card"><div class="post-infos"><div class="post-title">' + post.find("title").text() + '</div><div class="post-description">' + post.find("description").text().replace(/]]>/, '') + '</div></div><a href="' + post.find("link").text() + '" class="post-link"></a></div>');
      });
      $('.post-description > p:last-child').remove();
    });
  }
};
