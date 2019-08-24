/********************************
 * Controller directing data manipulation for Session Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/
const db = require("../models");
const TIMESTAMP = "T00:00:00.000Z";

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Session.findAll(req.query)
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Session.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: db.Member,
          include: [db.Status]
        }
      ]
    }).then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  findByNameAndDate: function (req, res) {
    db.Session.findOne({
      where: {
        team_name: req.params.teamName,
        session_date: req.params.sessionDate + TIMESTAMP,
      },
      include: [
        {
          model: db.Member,
          include: [db.Status]
        }
      ]
    }).then(dbSession => {
      if (dbSession !== null) {
        res.json(dbSession)
      }
      else {
        console.log("Calling createInitialSession");
        createInitialSession(req, res);
      }
    })
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    let session = req.body;
    db.Session.create({
      session_date: session.session_date,
      team_name: session.team_name,
      TeamId: session.TeamId
    })
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    let session = req.body;
    db.Session.update({
      session_date: session.session_date,
      team_name: session.team_name,
      TeamId: session.TeamId
    }, {
        where: { id: req.params.id }
      }).then(dbSession => {
        db.Session.findOne({
          where: { id: req.params.id }
        }).then(dbSession => res.json(dbSession))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Session.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  }
};

/**
 * Function to create Initial Session 
 * @param {*} req 
 * @param {*} res 
//  */
function createInitialSession(req, res) {
  db.Team.findOne({
    where: { team_name: req.params.teamName },
    include: [
      {
        model: db.Employee
      }
    ]
  }).then(dbTeam => {
    db.Session.create({
      session_date: req.params.sessionDate,
      team_name: req.params.teamName,
      TeamId: dbTeam.id
    })
      .then(dbSession => {
        dbTeam.Employees.forEach(employee => {
          db.Member.create({
            first_name: employee.first_name,
            last_name: employee.last_name,
            role: employee.role,
            image_link: employee.image_link,
            EmployeeId: employee.id,
            SessionId: dbSession.id
          })
            .then(dbMember => {})
            .catch(err => res.status(422).json(err));
        });
        db.Session.findOne({
          where: { id: dbSession.id },
          include: [db.Member]
        }).then(finalSession => res.json(finalSession))
          .catch(err => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  })
    .catch(err => res.status(422).json(err));
}
