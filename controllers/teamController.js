/********************************
 * Controller directing data manipulation for Team Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Team.findAll(req.query)
      .then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Team.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Employee
        }
      ]
    }).then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },
  findByName: function (req, res) {
    db.Team.findOne({
      where: { team_name: req.params.teamName },
      include: [
        {
          model: db.Employee
        }
      ]
    }).then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let team = req.body;
    db.Team.create({
      team_name: team.team_name
    })
      .then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let team = req.body;
    db.Team.update({
      team_name: team.team_name
    }, {
        where: { id: req.params.id }
      }).then(dbTeam => res.json(dbTeam))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Team.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbTeam => res.json(dbTeam))
    .catch(err => res.status(422).json(err));
  }
};
