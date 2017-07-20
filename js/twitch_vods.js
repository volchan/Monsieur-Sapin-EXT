function getTwitchVods() {
  if ($('.twitch-card').length == 0) {
    var channel = "monsieursapin";
    var clientId = "You won't get it here ;)";
    var url = "https://api.twitch.tv/kraken/channels/" + channel + "/videos?broadcasts=true&limit=20&client_id=" + clientId;
    var xhr_object = new XMLHttpRequest();
    xhr_object.onreadystatechange = function() {
      if (xhr_object.readyState==4 && xhr_object.status==200){
        var data = JSON.parse(xhr_object.responseText);
        var vods = data.videos
        for (var i = 0; i < vods.length; i++) {
          $('#twitch').append('<div class="twitch-card"><div class="thumbnail" style="background-image: url(' + vods[i].preview.replace(/320x240/, "320x180") + ')"></div><div class="infos"><a href="' + vods[i].url + '" class="vod-link">' + vods[i].title + '</a></div></div>');
        };
      }
    };
    xhr_object.open('GET', url, true);
    xhr_object.send();
  }
};
