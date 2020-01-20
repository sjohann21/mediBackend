const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Vendor = require("../models/vendor");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.vendorById = (req, res, next, id) => {
    Vendor.findById(id)
        .populate("category")
        .exec((err, vendor) => {
            if (err || !vendor) {
                return res.status(400).json({
                    error: "Vendor not found"
                });
            }
            req.vendor = vendor;
            next();
        });
};

exports.read = (req, res) => {
    req.vendor.photo = undefined;
    return res.json(req.vendor);
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        // check for all fields
        const { name,
            photo, address, address2, city,
            state, zip, contact, phone, phone2, email, 
            hoursOfOperation, areaOfOperation, description,
        } = fields;

        if (
            !name ||
            !address ||
            !address2 ||
            !city ||
            !state ||
            !zip ||
            !contact ||
            !phone ||
            !phone2 ||
            !email ||
            !hoursOfOperation ||
            !areaOfOperation ||
            !description
        ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        let vendor = new Vendor(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            vendor.photo.data = fs.readFileSync(files.photo.path);
            vendor.photo.contentType = files.photo.type;
        }

        vendor.save((err, result) => {
            if (err) {
                console.log("VENDOR CREATE ERROR ", err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req, res) => {
    let vendor = req.vendor;
    vendor.remove((err, deletedVendor) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Vendor deleted successfully"
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }

        let vendor = req.vendor;
        vendor = _.extend(vendor, fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: "Image should be less than 1mb in size"
                });
            }
            vendor.photo.data = fs.readFileSync(files.photo.path);
            vendor.photo.contentType = files.photo.type;
        }

        vendor.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /vendors?sortBy=sold&order=desc&limit=4
 * by arrival = /vendors?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all vendors are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Vendor.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, vendors) => {
            if (err) {
                return res.status(400).json({
                    error: "Vendor not found"
                });
            }
            res.json(vendors);
        });
};

/**
 * it will find the vendors based on the req vendor category
 * other vendors that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Vendor.find({ _id: { $ne: req.vendor }, category: req.vendor.category })
        .limit(limit)
        .populate("category", "_id name")
        .exec((err, vendors) => {
            if (err) {
                return res.status(400).json({
                    error: "vendors not found"
                });
            }
            res.json(vendors);
        });
};

exports.listCategories = (req, res) => {
    Vendor.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    });
};

/**
 * list vendors by search
 * we will implement vendor search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the vendors to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Vendor.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Vendors not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.vendor.photo.data) {
        res.set("Content-Type", req.vendor.photo.contentType);
        return res.send(req.vendor.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: "i" };
        // assigne category value to query.category
        if (req.query.category && req.query.category != "All") {
            query.category = req.query.category;
        }
        // find the vendor based on query object with 2 properties
        // search and category
        Vendor.find(query, (err, vendors) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(vendors);
        }).select("-photo");
    }
};

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.vendors.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    vendor.bulkWrite(bulkOps, {}, (error, vendors) => {
        if (error) {
            return res.status(400).json({
                error: "Could not update vendor"
            });
        }
        next();
    });
};
