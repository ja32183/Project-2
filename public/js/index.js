$(document).ready(function() {

  $("#login").on("click",function(){
    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
   
    //console.log(username);
    $.ajax({
      method: "GET",
      url: "/api/login/" + username
    }).then(function(result)
    {
      if(!result)
      {
        console.log("Username Does not exist");
        $("#password").val(' ');
        $("#username").val(' ');
      }
      else
      {
        console.log(result.Password);
        console.log(password);
        if(password === result.Password)
        {
          console.log("Login Success!");
        }
        else
        {
          console.log("Password Incorrect!");
          $("#password").val(' ');
        }
    }
    });
  });

});
 