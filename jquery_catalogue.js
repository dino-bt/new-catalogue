$(document).ready(function () {
  $("#roxy section p").hide();
  //hover function from drop down menu
  $("#roxy section h4").hover(function () {
    $("#roxy section p").hide();
    $(this).next("p").show();
  });

  //fade out and fade in of picture and then a button to stop the process.
  $(".fadeinfadeout").click(function () {
    $(".thank_you").fadeOut("slow").fadeIn("slow");
  });
});
