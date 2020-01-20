const express = require("express");
var router = express.Router();

const { createVendorUser } = require("../controllers/vendor-user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
//const { userById } = require("../controllers/user");

//router.get("/jane/:janeId", read);

router.post("/create/vendor/user", requireSignin, isAuth, isAdmin, createVendorUser);

//router.param("userId", userById);
//router.param("janeId", janeById);

module.exports = router;
