$('#twitch-btn').click(function() {
  chrome.tabs.create({url: 'https://www.twitch.tv/monsieursapin'});
});

$('#website-btn').click(function() {
  chrome.tabs.create({url: 'http://monsieursapin.fr/'});
});

$('#twitter-btn').click(function() {
  chrome.tabs.create({url: 'https://twitter.com/monsieursapin_'});
});

window.addEventListener('click', function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url: e.target.href})
    }
});

$(".tab-link").on("click", function(e){
  var tab_id = $(this).attr('data-tab');
  $(".tab-link").removeClass('active');
  $(this).addClass('active');
  $('.tab-content').removeClass('active');
  $("#" + tab_id).addClass('active');
});

function getTwitchVods() {
  var channel = "monsieursapin";
  var clientId = "g7dc2o9buaa6xrmiu846ghjz8c92jm";
  var url = "https://api.twitch.tv/kraken/channels/" + channel + "/videos?broadcasts=true&limit=20&client_id=" + clientId;
  var xhr_object = new XMLHttpRequest();
  xhr_object.onreadystatechange = function() {
    if (xhr_object.readyState==4 && xhr_object.status==200){
      var data = JSON.parse(xhr_object.responseText);
      var vods = data.videos
      for (var i = 0; i < vods.length; i++) {
        $('#twitch').append('<div class="twitch-card"><div class="thumbnail" style="background-image: url(' + vods[i].preview.replace(/320x240/, "320x180") + ')"></div><div class="infos">' + vods[i].title + '</div><a href="' + vods[i].url + '" class="vod-link"></a></div>');
      };
    }
  };
  xhr_object.open('GET', url, true);
  xhr_object.send();
};

$(document).ready(function() {
  getTwitchVods();
});
