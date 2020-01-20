const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const vendorUserSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        lname: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            trim: true,
            required: true
        },
        phone2: {
            type: String,
            trim: true
        },
        securityQuestion: {
            type: String,
            trim: true,
            default: "Steve"
        },
        securityAnswer: {
            type: String,
            trim: true,
            default: "Steve"
        },
        hashed_password: {
            type: String,
            default: "Steve"
        },
        regConfirmed: {
            type: Boolean,
            default: true
        },
        vendor: {
            type: ObjectId,
            ref: "Vendor",
            required: true
        },
        salt: {
            type: String,
            default: "Steve"
        },
        role: {
            type: String,
            default: "0"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("VendorUser", vendorUserSchema);
