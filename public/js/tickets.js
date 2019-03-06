$(document).ready(function() {
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