const express = require("express");
var router = express.Router();

const {
    create,
    capacityById,
    read,
    update,
    remove,
    list
} = require("../controllers/capacity");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

//Anytime there is a userId value in the route we want to
//execute userById (line 17) method and make the user information
//available in the req object
const { userById } = require("../controllers/user");

router.get("/capacity/:capacityId", read);
router.post("/capacity/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put("/capacity/:capacityId/:userId", requireSignin, isAuth, isAdmin, update);
router.delete("/capacity/:capacityId/:userId", requireSignin, isAuth, isAdmin, remove);
router.get("/capacities", list);

router.param("capacityId", capacityById);
router.param("userId", userById);

module.exports = router;
