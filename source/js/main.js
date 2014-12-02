$( document ).ready(function() {

  var header = $("#header");
  var headerHeight = $("#header").outerHeight();
  var checkboxLabels = $(".faqs label");
  var links = $("a");

  // Make links in the prototype unclickable
  $.each(links, function() {
    // console.log($(this));
    $(this).on("click", function(e) {
      e.preventDefault();
    })
  })

  // console.log(checkboxLabels);

  checkboxLabels.on("click", function(e) {
    // console.log(e.currentTarget);
    e.preventDefault();
    $("input:checked").prop('checked', false);
    $(this).prev().prop('checked', true);
  })

  $(window).scroll(function () {
    if (($(window).scrollTop() >= headerHeight) && ($(window).scrollTop() < 640)) {
      header.addClass("hidden");
    } else if ($(window).scrollTop() >= 640) {
      header.removeClass("dark hidden").addClass("light");
    } else {
      header.removeClass("light hidden").addClass("dark");
    }
  });
});