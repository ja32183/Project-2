var db = require("../models");

module.exports = function(app) {
    // Get all tickets
    app.get("/api/helpdesk", function(req, res) {
        db.Helpdesk.findAll({}).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });.

    //get all tickets assigned to a particular technician.
    app.get("/api/helpdesk/Assigned_To/Assigned_To:", function(req, res) {
        db.Helpdesk.findAll({
            where: {
                Assigned_To: req.params.Assigned_To
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    //git all tickets opened by a particular user.
    app.get("/api/helpdesk/Opened_By/Opened_By:", function(req, res) {
        db.Helpdesk.findAll({
            where: {
                Opened_By: req.params.Opened_By
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    //get one specific ticket based on ID.
    app.get("/api/helpdesk/Assigned_To/Assigned_To:", function(req, res) {
        db.Helpdesk.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    // Create a new ticket
    app.post("/api/helpdesk", function(req, res) {
        db.Helpdesk.create(req.body).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    // PUT route for updating tickets
    app.put("/api/helpdesk", function(req, res) {
        // Add code here to update a post using the values in req.body, where the id is equal to
        db.Helpdesk.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    // Delete a ticket by id
    app.delete("/api/helpdesk/:id", function(req, res) {
        db.Helpdesk.destroy({ where: { id: req.params.id } }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });
};