/********************************
 * Routes for Member Model
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

const router = require("express").Router();
const memberController = require("../../controllers/memberController");

// Matches with "/api/members"
router.route("/")
  .get(memberController.findAll)
  .post(memberController.create);

// Matches with "/api/members/:id"
router
  .route("/:id")
  .get(memberController.findById)
  .put(memberController.update)
  .delete(memberController.remove);

module.exports = router;
