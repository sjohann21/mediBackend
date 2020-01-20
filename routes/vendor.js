const express = require("express");
const router = express.Router();

//Controller will use ... create, vendorById, read, etc
const {
    create,
    read,
    remove,
    update,
    vendorById,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo,
    listSearch
} = require("../controllers/vendor");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/vendor/:vendorId", read);
router.post("/vendor/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/vendor/:vendorId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/vendor/:vendorId/:userId", requireSignin, isAuth, isAdmin, update);

router.get("/vendors", list);

router.get("/vendors/search", listSearch);
router.get("/vendors/related/:vendorId", listRelated);
router.get("/vendors/categories", listCategories);
router.post("/vendors/by/search", listBySearch);
router.get("/vendor/photo/:vendorId", photo);

//router.param: userId, vendorById (makes these values
//available to the req object then available for use in the controller)
router.param("userId", userById);
router.param("vendorId", vendorById);

module.exports = router;
