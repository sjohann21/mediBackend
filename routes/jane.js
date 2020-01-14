const express = require("express");
var router = express.Router();

//Controller will use ... create, productById, read, etc
const {
  create,
  read
} = require("../controllers/jane");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
//const { userById } = require("../controllers/user");

//router.get("/jane/:janeId", read);

router.post("/create/jane", requireSignin, isAuth, isAdmin, create);

//router.param("userId", userById);
//router.param("janeId", janeById);

module.exports = router;
