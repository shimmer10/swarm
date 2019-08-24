/********************************
 * Routes for Status Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const statusController = require("../../controllers/statusController");

// Matches with "/api/statuses"
router.route("/")
  .get(statusController.findAll)
  .post(statusController.create);

// Matches with "/api/statuses/:id"
router
  .route("/:id")
  .get(statusController.findById)
  .put(statusController.update)
  .delete(statusController.remove);

module.exports = router;
