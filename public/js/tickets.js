$(document).ready(function() {
   
    //push ticket data to mysql db
    
    $("#send-btn").on("click", function(event) {
        event.preventDefault();
        var newTicket = {
          category: $("#category").val().trim(),
          description: $("#ticketDescription").val().trim()
        
        };
  
        
        $.post("/api/characters", newTicket)
          .then(function(data) {
            console.log("add.html", data);
            alert("Ticket has been added");
          });
      });

      // This function grabs all the tickets in the DB
  function getTickets (category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/posts" + categoryString, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteTicket (id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    })
      .then(function() {
        getPosts(postCategorySelect.val());
      });
  }

  // Getting list of all tickets
  getTickets();
  
  
  });
  