$(document).ready(function() {

  $("#login").on("click",function(){
    var username = $("#username").val().trim();
    localStorage.setItem("username", username);
  
   
    // $.ajax({
    //   method: "GET",
    //   url: "/api/login/" + username
    // }).then(function(result)
    // {
    //   if(!result)
    //   {
    //     console.log("Username Does not exist");
       
    //     $("#password").val(' ');
    //     $("#username").val(' ');
    //   }
    //   else
    //   {
    //     if(password === result.Password)
    //     {
    //       console.log("Login Success!");
    //       window.location.pathname = '/tickets'
    //     }
    //     else
    //     {
    //       console.log("Password Incorrect!");
         
    //       $("#password").val(' ');
    //     }
    //   }
    // });

    // $.ajax
    // ({
    //   method: "POST",
    //   url:"/api/login",
    //   data: {username:username, password:password}
    //  })
     //.then(function(result)
    // {
    //   if(!result)
    //   {
    //     console.log("Username Does not exist");
       
    //     $("#password").val(' ');
    //     $("#username").val(' ');
    //   }
    //   else
    //   {
    //     if(password === result.Password)
    //     {
    //       console.log("Login Success!");
    //       window.location.pathname = '/tickets'
    //     }
    //     else
    //     {
    //       console.log("Password Incorrect!");
         
    //       $("#password").val(' ');
    //     }
    //   }
    // });
  });




});