const mongoose = require('mongoose');
const joi = require('joi');
const schema = mongoose.Schema;

const adminSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const adminValidation = (admin) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(admin);
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = { Admin, adminValidation };