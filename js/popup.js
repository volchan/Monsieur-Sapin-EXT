window.addEventListener('click', function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url: e.target.href})
    }
});

function twitchBtn() {
  removeBtn();
  streamType = $('twitch-tab').attr('data-stream-type');
  if (streamType == 'live') {
    $('.content').prepend('<div id="btn"><a href="https://www.twitch.tv/monsieursapin">Monsieur sapin est en live !</a></div>');
  } else if (streamType == 'vod') {
    $('.content').prepend('<div id="btn"><a href="https://www.twitch.tv/monsieursapin">Monsieur sapin à lancé une vod !</a></div>');
  } else {
    $('.content').prepend('<div id="btn"><a href="https://www.twitch.tv/monsieursapin">Accéder à la chaîne</a></div>');
  }
};

function websiteBtn() {
  removeBtn();
  $('.content').prepend('<div id="btn"><a href="https://www.monsieursapin.fr">Accéder au site web</a></div>');
};

function removeBtn() {
  $('#btn').remove();
};

function btnDisplay() {
  if ($('#twitch').is(':visible')) {
    twitchBtn();
  } else if ($('#website').is(':visible')) {
    websiteBtn();
  } else {
    removeBtn();
  }
};

function hoveringWebsiteLinks() {
  $('.post-link').hover(
    function() {
      $(this).parent().addClass('hover');
      $(this).parent().removeClass('no-hover');
      $(this).parent().children().children().first().addClass('white-title');
      $(this).parent().children().children().first().removeClass('green-title');
      $(this).parent().children().children().last().addClass('green-text');
      $(this).parent().children().children().last().removeClass('black-text');
    },
    function() {
      $(this).parent().addClass('no-hover');
      $(this).parent().removeClass('hover');
      $(this).parent().children().children().first().addClass('green-title');
      $(this).parent().children().children().first().removeClass('white-title');
      $(this).parent().children().children().last().addClass('black-text');
      $(this).parent().children().children().last().removeClass('green-text');
    }
  );
};

$(".tab-link").on("click", function(e){
  var tab_id = $(this).attr('data-tab');
  $(".tab-link").removeClass('active');
  $(this).addClass('active');
  $('.tab-content').removeClass('active');
  $("#" + tab_id).addClass('active');
  btnDisplay();
  if (tab_id == "twitch") {
    getTwitchVods();
  } else if (tab_id == "website") {
    getFeed();
  }
});

hoveringWebsiteLinks();
getTwitchVods();
btnDisplay();
