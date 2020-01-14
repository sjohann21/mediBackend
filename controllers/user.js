const User = require('../models/user')
const { Order } = require("../models/order");
const { errorHandler } = require("../helpers/dbErrorHandler");

//Get the UserId from the Route parameter
//localhost:8000/api/create/jane/5dec16ce7cc9551f8a806e44
exports.userById = (req,res,next,id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: 'Controller user: User not found/authorized to add'
            })
        }
        req.profile = user 
        next()
    })
}

exports.read = (req,res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

exports.update = (req,res) => {
    User.findOneAndUpdate({_id: req.profile._id}, {$set: req.body},{new:true},
        (err, user) => {
            if(err) {
                return res.status(400).json({
                    error: 'You are not authorized to perform this action'
                })
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            console.log('res.json user = ', user)
            res.json(user)
        })
}

exports.addOrderToUserHistory = (req, res, next) => {
  let history = [];

  req.body.order.products.forEach(item => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Could not update user purchase history"
        });
      }
      next();
    }
  );
};

exports.purchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-created")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(orders);
    });
};
