$(document).ready(function() {

  $("#login").on("click",function(){
    var username = $("#username").val().trim();
    console.log(username);
    $.ajax({
      method: "GET",
      url: "/api/login/" + username
    }).then(function(result)
    {
      console.log(result);
      console.log(result.Admin);
    });
  });

});
 