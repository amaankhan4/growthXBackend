const mongoose = require('mongoose');
const joi = require('joi');
const schema = mongoose.Schema;

const userSchema = new schema({
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
    },
    assignment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assignment',
    }
});

const assignmentSchema = new schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name:{type: String, required: true},
    task:{type: String, required: true},
    admin:{type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin'},
    status:{type:String, enum: ['pending', 'accepted', 'rejected'], default: 'pending'},
});

const userValidation = (user) => {
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    return schema.validate(user);
}
const assignmentValidation = (assignment) => { 
    const schema = joi.object({
        name: joi.string().required(),
        task: joi.string().required(),
        admin: joi.string().required(),
    });
    return schema.validate(assignment);
} 

const User = mongoose.model('User', userSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = { User, userValidation, Assignment, assignmentValidation };