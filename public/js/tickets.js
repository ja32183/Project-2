$(document).ready(function() {
    $("#submit").on("click", function(event) {

        createTicket();
    });

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