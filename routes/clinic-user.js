const express = require("express");
var router = express.Router();

const { createClinicUser } = require("../controllers/clinic-user");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
//const { userById } = require("../controllers/user");

//router.get("/jane/:janeId", read);

router.post("/create/clinic/user", requireSignin,  isAdmin, createClinicUser);

//router.param("userId", userById);
//router.param("janeId", janeById);

module.exports = router;






// const express = require("express");
// const router = express.Router();

// //Controller will use ... create, productById, read, etc
// const { create, createClinicUser, clinicUserById, read, remove, update, list, listRelated, listRoles, listClinics, listBySearch, photo } = require("../controllers/clinic-user");
// const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
// //This is the Medicentric admin user that will add the clinic_user
// const { userById } = require("../controllers/user");

// router.post("/create/clinic/user", requireSignin, isAuth, isAdmin, createClinicUser);

// router.post("/clinic-users/by/search", listBySearch);
// router.get('/clinic-users/clinics', listClinics)
// router.get('/clinic-users/related/:clinicUserId', listRelated)
// router.get('/clinic-users/roles', listRoles)
// router.get('/clinic-users', list);
// router.get('/clinic-user/:clinicUserId', read)
// //router.post("/clinic-user/create/:userId", requireSignin, isAuth, isAdmin, create);
// router.delete("/clinic-user/:clinicUserId/:userId", requireSignin, isAuth, isAdmin, remove);
// router.put("/clinic-user/:clinicUserId/:userId", requireSignin, isAuth, isAdmin, update);
// router.get("/clinic-users/photo/:clinicUserId", photo);

// //router.param: userId, productById (makes these values
// //available to the req object then available for use in the controller)
// //router.param("userId", userById);
// //router.param("clinicUserId", clinicUserById);
// //console.log("clinicById = ", clinicById);

// module.exports = router;
