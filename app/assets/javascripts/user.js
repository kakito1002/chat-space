$(function() {
    $(".search__query").on("keyup", function() {
      var input = $(".search__query").val();
      console.log(input);
    });
  });