const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}
})

UserSchema.pre('save' , function(next) {
    if(this.isModified('password')) {
        bcrypt.hash(this.password, 8, (error, hash) => {
            if(error) return next(error);

            this.password = hash;
            next();
        })
    }
})

UserSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('There is no password');

    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password')
    }
}

module.exports = mongoose.model('User', UserSchema)