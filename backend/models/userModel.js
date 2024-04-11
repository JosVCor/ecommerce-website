const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create a schema for the address
const addressSchema = new mongoose.Schema({
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
}, {timestamps: true});

// Create a schema for the user
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, default: '', required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true},
    address: {type: addressSchema, required: true},
    phone: {type: String, required: true}
}, {timestamps: true});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password') || user.isNew) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            next();
        } catch (error) {
            return next(error);
        }
    } else {
        return next();
    }
});

// Create a model for the user
const userModel = mongoose.model("User", userSchema);

// Export the model
module.exports = userModel;