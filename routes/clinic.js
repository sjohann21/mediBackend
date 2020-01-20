const express = require("express");
var router = express.Router();

//Controller will use ... create, productById, read, etc
const { 
  create, 
  read,
  clinicById,
  list
} = require("../controllers/clinic");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
//const { userById } = require("../controllers/user");
router.get("/clinic/:clinicId", read);
router.get("/clinics", list);
//router.get("/jane/:janeId", read);

router.post("/create/clinic/:userId", requireSignin, isAuth, isAdmin, create);
router.param("clinicId", clinicById);

module.exports = router;


// const express = require("express");
// var router = express.Router();

// //Controller will use ... create, productById, read, etc
// const {
//   create,
//   read
// } = require("../controllers/clinic");
// const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
// //const { userById } = require("../controllers/user");

// //router.get("/jane/:janeId", read);

// router.post("/create/clinic/:userId", requireSignin, isAuth, isAdmin, create);

// //router.param("userId", userById);
// //router.param("janeId", janeById);

// module.exports = router;




// // const express = require("express");
// // const router = express.Router();

// // const {
// //   create,
// //   clinicById,
// //   read,
// //   remove,
// //   list
// // } = require("../controllers/clinic");
// // const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
// // const { userById } = require("../controllers/user");

// // router.get('/clinic/:clinicId', read)
// // //router.put("/clinic/:clinicId/:userId", requireSignin, isAuth, isAdmin, update);
// // router.delete("/clinic/:clinicId/:userId", requireSignin, isAuth, isAdmin, remove);
// // router.post("/clinic/create/:userId", requireSignin, isAuth, isAdmin, create);
// // router.get("/clinics", list);
// // //router.get("/clinic/photo/:clinicId", photo);

// // //router.param('clinicById', clinicById)
// // router.param("clinicId", clinicById);
// // router.param("userId", userById);

// // module.exports = router;
