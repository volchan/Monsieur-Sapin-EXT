window.addEventListener('click', function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url: e.target.href})
    }
});

function twitchBtn() {
  removeBtn();
  if ($('#live-dot').is(':visible')) {
    $('.content').prepend('<div id="btn"><a href="https://www.twitch.tv/monsieursapin">MONSIEUR SAPIN EST LIVE !</a></div>');
  } else {
    $('.content').prepend('<div id="btn"><a href="https://www.twitch.tv/monsieursapin">ACCEDER A LA CHAINE</a></div>');
  }
};

function websiteBtn() {
  removeBtn();
  $('.content').prepend('<div id="btn"><a href="https://www.monsieursapin.fr">ACCEDER AU SITE WEB</a></div>');
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
    },
    function() {
      $(this).parent().addClass('no-hover');
      $(this).parent().removeClass('hover');
      $(this).parent().children().children().first().addClass('green-title');
      $(this).parent().children().children().first().removeClass('white-title');
    }
  );
}

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
