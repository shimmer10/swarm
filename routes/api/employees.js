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
  .get(employeeController.findAll)
  // .post(employeeController.create);
  .post(passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }
  ));

// Matches with "/api/employees/login"
router.route("/login")
.post(passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
}
));

// Matches with "/api/employees/:id"
router
  .route("/:id")
  .get(employeeController.findById)
  .put(employeeController.update)
  .delete(employeeController.remove);

module.exports = router;
