$(document).ready(function() {

    //David.S code starts here.
    var username = localStorage.getItem("username");
    console.log(username);


    $(document).on("click", "button#ticketDetailButton",
        getTicketDetails);

    function getUserCreds() {
        $.get("/api/login/" + username, function(data) {
            console.log("Is Admin: " + data.Admin);
            if (data.Admin) {
                getAllTickets();
            } else {
                console.log("called");
                getUsersTickets();
            }
        })
    }

    function createTicket() {
        var ticket = $("#request-type").val().trim();
        var description = $("#problem-description").val().trim();
        var newTicket = {
            Title: ticket,
            Description: description,
            Created_By: username
        };
        $.post("api/helpdesk", newTicket).then(location.reload());
    }

    function getAllTickets() {
        $("#userTicketsAppend").empty();
        $.get("/api/helpdesk", function(data) {
            if (data.length === 0) {
                $("#userTicketsAppend").append("No Current Tickets");
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status !== 'Closed') {
                        $("#userTicketsAppend").append("<tr><td>" + data[i].id + "</td><td>" + data[i].Description + "</td><td>" + data[i].Status + "</td><td><button class='btn btn-primary' id='ticketDetailButton' value='" + data[i].id + "' data-target='ticketDetailsModal'>Ticket Details</button></td></tr>");
                    }
                }
            }
        });
    }

    function getUsersTickets() {
        $("#userTicketsAppend").empty();
        console.log(username);
        var Created_By = username;
        $.get("/api/helpdesk/Opened_By/" + Created_By, function(data) {
            if (data.length === 0) {
                $("#userTicketsAppend").append("No Current Tickets");
            } else {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status !== 'Closed') {
                        $("#userTicketsAppend").append("<tr><td>" + data[i].id + "</td><td>" + data[i].Description + "</td><td>" + data[i].Status + "</td><td><button class='btn btn-primary' id='ticketDetailButton' value='" + data[i].id + "' data-target='ticketDetailsModal'>Ticket Details</button></td></tr>");
                    }
                }
            }
        })
    }

    $("#submit").on("click", function(event) {
        createTicket();
    });

    getUserCreds();

    function getTicketDetails(event) {
        event.preventDefault();
        var ticketID = event.target.value;
        $.get("/api/helpdesk/ticket/" + ticketID, function(data) {
            $("#ticket-number").text(data.id);
            $("#ticket-number").val(data.id);
            $("select [id=request-type-update]").find("option[value=" + data.id + "]").attr("selected", true);
            $("#problem-description-update").text(data.Description);
            $("select [id=request-type-update]").find("option[value=" + data.Status + "]").attr("selected", true);
            $("#ticket-notes").text(data.Notes);
            $("#ticket-details").modal("toggle");
        })
    }

    function updateTickets() {
        var id = $("#ticket-number").val().trim();
        var notes = $("#ticket-notes").val().trim();
        var status = $("#status").val().trim();
        var type = $("#request-type-update").val().trim();
        var updateTicket = {
            id: id,
            Title: type,
            Status: status,
            Notes: notes
        }
        $.ajax({
            method: "PUT",
            url: "/api/helpdesk/update",
            data: updateTicket
        }).then(getUserCreds());
    }

    $("#update").on("click", function(event) {
        updateTickets();
    })
});