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
  

    $("#submit").on("click", function(event) {
        event.preventDefault();
        createTicket();
    });

    function createTicket() {
        var ticket = $("#request-type").val().trim();
        var description = $("#problem-description").val().trim();
        var newTicket = {
            Opened_By: placeholder, //placeholder
            Title: ticket,
            Description: description
        };
        $.post("api/helpdesk", newTicket).then(getTickets());
        $("#problem-description").val("");
    }

    function getAllTickets() {
        $.get("/tickets", function(data) {
            if (data.length === 0) {
                $("#userTickets").append("No Current Tickets");
            } else {
                for (var i = 0; i < data.length; i++) {
                    $("#userTicketsAppend").append("<tbody><tr><td>" + data[i].id + "</td><td>" + data[i].Description + "</td><td>" + "</td><td>" + data[i].Status + "</td><td><button class='btn btn-primary' id='ticketDetailButton' value='" + data[i].id + "' data-target='ticketDetailsModal'>Ticket DetailsM/button></td></tr>");
                }
            }
        });
    }

    getAllTickets();
});

