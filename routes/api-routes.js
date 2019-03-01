// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbPost);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function(req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.Post.findAll(
      {
          where: {category:req.params.category}
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function(req, res) {
    // Add sequelize code to find a single post where the id is equal to req.params.id,
    // return the result to the user with res.json
    db.Post.findOne(
      {
          where: {category:req.params.id}
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
      db.Post.create
      ({
          title: req.body.title,
          body: req.body.body,
          category: req.body.category
      }).then(function(dbPost)
      {
        res.json(dbPost);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
      db.Post.destroy({where: {id:req.body.id}}).then(function(dbPost)
      {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body,{where:{id: req.body.id}}).then(function(dbPost)
    {
      res.json(dbPost);
    });
  });
};
