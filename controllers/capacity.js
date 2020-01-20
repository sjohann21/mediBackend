const Capacity = require("../models/capacity");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.capacityById = (req, res, next, id) => {
    Capacity.findById(id).exec((err, capacity) => {
        if (err || !capacity) {
            return res.status(400).json({
                error: "Capacity does not exists"
            });
        }
        //add capacity to req
        req.capacity = capacity;
        next();
    });
};

exports.create = (req, res) => {
    const capacity = new Capacity(req.body);
    capacity.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.capacity);
};

exports.update = (req, res) => {
    const capacity = req.capacity;
    capacity.name = req.body.name;
    capacity.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    const capacity = req.capacity;
    capacity.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        //res.json(data);
        res.json({
            message: "Capacity deleted"
        });
    });
};

exports.list = (req, res) => {
    Capacity.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
