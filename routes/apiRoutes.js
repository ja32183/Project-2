var db = require("../models");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username +" "+ password);
        db.Users.findOne({
            where: {

              username:username}
            }).then(function(user){
        if (!user) {
            
            return done(null, false);
        }
        if (password !== user.Password) {
            
            return done(null, false);
        }
        
        return done(null, true);
      });
    }));

module.exports = function(app) {

    app.post('/api/login',
    passport.authenticate('local', {successRedirect: '/tickets',failureRedirect: '/',session: false}));

    // Get the one user
    app.get("/api/login/:username", function(req, res) {
        db.Users.findOne({
            where: {
                username: req.params.username
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    // Get all tickets
    app.get("/api/helpdesk", function(req, res) {
        db.Helpdesk.findAll({}).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    // Get one ticket by id to see details and update.
    app.get("/api/helpdesk/ticket/:id", function(req, res) {
        db.Helpdesk.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbHelpdesk) {
            res.json(dbHelpdesk);
        });
    });

    //git all tickets opened by a particular user.
    app.get("/api/helpdesk/Opened_By/:Created_By", function(req, res) {
        db.Helpdesk.findAll({
            where: {
                Created_By: req.params.Created_By
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
    app.put("/api/helpdesk/update", function(req, res) {
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