exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 50
    });
  req.check("password", "Password is required").notEmpty();
  req.check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.addClinicValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("address", "Address is required").notEmpty();
  req.check("city", "City is required").notEmpty();
  req.check("state", "State is required")
    .isLength({ max: 2 }).withMessage("State must be 2 characters");
  req.check("zip", "Zip is required").matches(/\d/)
    .isLength({ max: 5 }).withMessage("Zip Code must be 5 characters")
  req.check("contact", "Contact is required").notEmpty();
  req.check("phone", "Phone is required").isLength({ min: 10 })
    .withMessage("Phone must be 10 characters")

  req.check("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 50
    });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};