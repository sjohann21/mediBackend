const VendorUser = require("../models/vendor-user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.vendorUserById = (req, res, next, id) => {
    console.log("*** CONTROLLER: vendor-user vendorUserById")
    VendorUser.findById(id)
        .populate("vendor")
        .exec((err, vendorUser) => {
            if (err || !vendorUser) {
                return res.status(400).json({
                    error: "vendor User is not found"
                });
            }
            req.vendorUser = vendorUser;
            next();
        });
};

exports.createVendorUser = (req, res) => {
    console.log("*** VendorUser CONTROLLER req.body = ", req.body);
    const vendorUser = new VendorUser(req.body);
    vendorUser.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.listVendors = (req, res) => {
    VendorUser.distinct("vendor", {}, (err, vendors) => {
        if (err) {
            return res.status(400).json({
                error: "Vendors not found"
            });
        }
        res.json(vendors);
    });
};
