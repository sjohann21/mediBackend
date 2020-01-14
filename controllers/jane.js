const Jane = require("../models/jane");
const { errorHandler } = require("../helpers/dbErrorHandler");

//jane controllers
exports.create = (req, res) => {
  const jane = new Jane(req.body);
  jane.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.jane);
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

exports.janeById = (req, res, next, id) => {
  Jane.findById(id).exec((err, jane) => {
    if (err || !jane) {
      return res.status(400).json({
        error: "Jane does not exists"
      });
    }
    //add category to req
    req.jane = jane;
    next();
  });
};