const Clinic = require("../models/clinic");
const { errorHandler } = require("../helpers/dbErrorHandler");

//clinic controllers
exports.create = (req, res) => {
  const clinic = new Clinic(req.body);
  clinic.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.clinic);
};

exports.list = (req, res) => {
  Clinic.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json(data);
  });
};

// exports.create = async (req, res) => {
//   try {
//     const jane = await new Jane(req.body);
//     console.log(req.body);

//     await jane.save((err, jane) => {
//       if (err) {
//         // return res.status(400).json({ err });
//         return res.status(400).json({
//           error: "JANE CONTROLLER: Email is taken"
//         });
//       }
//       console.log("SENDING EMAIL FOR SIGNUP VERIFICATION ...");
//       res.status(200).json({ jane });
//     });
//   } catch (err) {
//     console.error(err.message);
//   }
// };

exports.clinicById = (req, res, next, id) => {
  console.log("CONTROLLERS: clinicById")
  Clinic.findById(id).exec((err, clinic) => {
    if (err || !clinic) {
      return res.status(400).json({
        error: "Clinic does not exists"
      });
    }
    //add clinic to req
    req.clinic = clinic;
    next();
  });
};