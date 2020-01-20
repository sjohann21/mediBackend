const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require("cors");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const expressValidator = require('express-validator')

require("dotenv").config();

//IMPORT ROUTES
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const capacityRoutes = require("./routes/capacity");
const janeRoutes = require("./routes/jane");
const clinicRoutes = require("./routes/clinic");
const productRoutes = require("./routes/product");
const vendorRoutes = require("./routes/vendor");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

const clinicUserRoutes = require("./routes/clinic-user");
const vendorUserRoutes = require("./routes/vendor-user");

//APP
const app = express()

//DATABASE
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => console.log("DB Connected"));

//MIDDLEWARE
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//ROUTES MIDDLEWARE
app.use('/api', authRoutes)
app.use('/api', userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", capacityRoutes);
app.use("/api", productRoutes);
app.use("/api", vendorRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);
app.use("/api", clinicRoutes);
app.use("/api", janeRoutes);
app.use("/api", clinicUserRoutes);
app.use("/api", vendorUserRoutes);


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})