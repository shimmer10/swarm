/********************************
 * Routes for Employee Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const passport = require('passport');
const employeeController = require("../../controllers/employeeController");

// Matches with "/api/employees"
router.route("/")
  .get(employeeController.findAll);


// Matches with "/api/employees/register"
router.route("/register")
  // if we fail to authenticate then passport will respond with a 401 unauthorized status
  .post(passport.authenticate('local-signup'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user);
    res.json(req.user);
  });


// Matches with "/api/employees/login"
router.route("/login")
  // if we fail to authenticate then passport will respond with a 401 unauthorized status
  .post(passport.authenticate('local-signin'), function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log(req.user);
    res.json(req.user);
  });


// Matches with "/api/employees/:id"
router
  .route("/:id")
  .get(employeeController.findById)
  .put(employeeController.update)
  .delete(employeeController.remove);

module.exports = router;
