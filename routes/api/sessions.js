/********************************
 * Routes for Session Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const sessionController = require("../../controllers/sessionController");

// Matches with "/api/sessions"
router.route("/")
  .get(sessionController.findAll)
  .post(sessionController.create);

// Matches with "/api/sessions/:id"
router
  .route("/:id")
  .get(sessionController.findById)
  .put(sessionController.update)
  .delete(sessionController.remove);

router
  // .route("/:teamName/:sessionDate")
  .route("/team/:teamName/:sessionDate")
  .get(sessionController.findByNameAndDate)

module.exports = router;
