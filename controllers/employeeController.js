/********************************
 * Controller directing data manipulation for Employee Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Employee.findAll(req.query)
      .then(dbEmployee => res.json(dbEmployee))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Employee.findOne({
      where: { id: req.params.id }
    }).then(dbEmployee => res.json(dbEmployee))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let employee = req.body;
    db.Employee.create({
      first_name: employee.first_name,
      last_name: employee.last_name,
      role: employee.role,
      email: employee.email,
      password: employee.password,
      employee_number: employee.employee_number,
      image_link: employee.image_link,
      last_login: employee.last_login,
      status: employee.status,
      TeamId: employee.TeamId
    })
      .then(dbEmployee => res.json(dbEmployee))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let employee = req.body;
    db.Employee.update({
      // id: employee.id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      role: employee.role,
      email: employee.email,
      password: employee.password,
      employee_number: employee.employee_number,
      image_link: employee.image_link,
      last_login: employee.last_login,
      status: employee.status,
      // createdAt: employee.createdAt,
      // updatedAt: employee.updatedAt,
      TeamId: employee.TeamId
    }, {
        where: { id: req.params.id }
      }).then(dbEmployee => {
        db.Employee.findOne({
          where: { id: req.params.id }
        }).then(dbEmployee => res.json(dbEmployee))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Employee.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbEmployee => res.json(dbEmployee))
      .catch(err => res.status(422).json(err));
  }
};
