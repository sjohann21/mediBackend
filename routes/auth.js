const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  signout,
  addJane,
  addClinic,
  requireSignin
} = require("../controllers/auth");
console.log("routes/auth.js")
const { userSignupValidator, addClinicValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/create/jane", userSignupValidator, addJane);
router.post("/create/clinic", addClinicValidator, addClinic);

router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
