/********************************
 * Controller directing data manipulation for Project Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Project.findAll(req.query)
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Project.findOne({
      where: { id: req.params.id }
    }).then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let project = req.body;
    db.Project.create({
      project_name: project.project_name,
      description: project.description
    })
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let project = req.body;
    db.Project.update({
      project_name: project.project_name,
      description: project.description
    }, {
        where: { id: req.params.id }
      }).then(dbProject => {
        db.Project.findOne({
          where: { id: req.params.id }
        }).then(dbProject => res.json(dbProject))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Project.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  }
};
