/********************************
 * Routes for Team Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const teamController = require("../../controllers/teamController");

// Matches with "/api/teams"
router.route("/")
  .get(teamController.findAll)
  .post(teamController.create);

// Matches with "/api/teams/:id"
router
  .route("/:id")
  .get(teamController.findById)
  .put(teamController.update)
  .delete(teamController.remove);

// Matches with "/api/teams/team/:teamName"
router
  .route("/team/:teamName")
  .get(teamController.findByName)

module.exports = router;
