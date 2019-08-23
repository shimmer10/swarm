/********************************
 * Controller directing data manipulation for Member Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Member.findAll(req.query)
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Member.findOne({
      where: { id: req.params.id }
    }).then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let member = req.body;
    db.Member.create({
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.role,
      image_link: member.image_link,
      EmployeeId: member.EmployeeId,
      SessionId: member.SessionId
    })
      .then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let member = req.body;
    db.Member.update({
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.role,
      image_link: member.image_link,
      EmployeeId: member.EmployeeId,
      SessionId: member.SessionId
    }, {
        where: { id: req.params.id }
      }).then(dbMember => {
        db.Member.findOne({
          where: { id: req.params.id }
        }).then(dbMember => res.json(dbMember))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Member.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbMember => res.json(dbMember))
      .catch(err => res.status(422).json(err));
  }
};
