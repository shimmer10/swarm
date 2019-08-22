/********************************
 * Routes for Employee Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with "/api/employees"
router.route("/")
  .get(employeeController.findAll)
  .post(employeeController.create);

// Matches with "/api/employees/:id"
router
  .route("/:id")
  .get(employeeController.findById)
  .put(employeeController.update)
  .delete(employeeController.remove);

module.exports = router;
