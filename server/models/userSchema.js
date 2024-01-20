import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const photoUserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})

photoUserSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

const User = mongoose.model('PHOTOUSER', photoUserSchema);

export default User