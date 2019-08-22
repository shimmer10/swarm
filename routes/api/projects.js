/********************************
 * Routes for Project Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const projectController = require("../../controllers/projectController");

// Matches with "/api/projects"
router.route("/")
  .get(projectController.findAll)
  .post(projectController.create);

// Matches with "/api/projects/:id"
router
  .route("/:id")
  .get(projectController.findById)
  .put(projectController.update)
  .delete(projectController.remove);

module.exports = router;
