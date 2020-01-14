const express = require("express");
var router = express.Router();
 
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list
} = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

//Anytime there is a userId value in the route we want to
//execute userById (line 17) method and make the user information
//available in the req object
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/category/:categoryId/:userId",requireSignin, isAuth, isAdmin, update);
router.delete( "/category/:categoryId/:userId", requireSignin,isAuth, isAdmin, remove);
router.get("/categories", list);

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
