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
    function getTickets(category) {
        var categoryString = category || "";
        if (categoryString) {
            categoryString = "/category/" + categoryString;
        }
        $.get("/api/posts" + categoryString, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty();
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deleteTicket(id) {
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

    $("#submit").on("click", function(event) {

        createTicket();
    });


    //David s code starts here.
    function createTicket() {
        var ticket = $("#request-type").val().trim();
        var description = $("#problem-description").val().trim();
        var newTicket = {

            Title: ticket,
            Description: description
        };
        $.post("api/helpdesk", newTicket).then(getAllTickets());
        $("#problem-description").val("");
    }

    function getAllTickets() {
        $("#userTicketsAppend").empty();
        $.get("/api/helpdesk", function(data) {
            if (data.length === 0) {
                $("#userTicketsAppend").append("No Current Tickets");
            } else {
                for (var i = 0; i < data.length; i++) {
                    $("#userTicketsAppend").append("<tr><td>" + data[i].id + "</td><td>" + data[i].Description + "</td><td>" + data[i].Status + "</td><td><button class='btn btn-primary' id='ticketDetailButton' value='" + data[i].id + "' data-target='ticketDetailsModal'>Ticket Details</button></td></tr>");
                }
            }
        });
    }

    getAllTickets();
});