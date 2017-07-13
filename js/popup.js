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
