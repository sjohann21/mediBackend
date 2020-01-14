const ClinicUser = require("../models/clinic-user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.clinicUserById = (req, res, next, id) => {
  console.log("*** CONTROLLER: clinic-user clinicUserById", )
  ClinicUser.findById(id)
    .populate("clinic")
    .exec((err, clinicUser) => {
      if (err || !clinicUser) {
        return res.status(400).json({
          error: "Clinic User is not found"
        });
      }
      req.clinicUser = clinicUser;
      next();
    });
};


exports.createClinicUser = (req, res) => {
  console.log("ClinicUser req.body = ", req.body);
  const clinicUser = new ClinicUser(req.body);
  clinicUser.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.listClinics = (req, res) => {
  ClinicUser.distinct("clinic", {}, (err, clinics) => {
    if (err) {
      return res.status(400).json({
        error: "Clinics not found"
      });
    }
    res.json(clinics);
  });
};
