/********************************
 * Controller directing data manipulation for Status Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Status.findAll(req.query)
      .then(dbStatus => res.json(dbStatus))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Status.findOne({
      where: { id: req.params.id }
    }).then(dbStatus => res.json(dbStatus))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let status = req.body;
    db.Status.create({
      current_status: status.current_status,
      yesterday_description: status.yesterday_description,
      today_description: status.today_description,
      blocker_description: status.blocker_description,
      MemberId: status.MemberId
    })
      .then(dbStatus => res.json(dbStatus))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let status = req.body;
    db.Status.update({
      current_status: status.current_status,
      yesterday_description: status.yesterday_description,
      today_description: status.today_description,
      blocker_description: status.blocker_description,
      MemberId: status.MemberId
    }, {
        where: { id: req.params.id }
      }).then(dbStatus => {
        db.Status.findOne({
          where: { id: req.params.id }
        }).then(dbStatus => res.json(dbStatus))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Status.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbStatus => res.json(dbStatus))
      .catch(err => res.status(422).json(err));
  }
};
