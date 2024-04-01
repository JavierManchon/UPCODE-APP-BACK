const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema(
    {
        name: { type: String, trim: true, required: true },
        surname: { type: String, trim: true, required: true },
        username: { type: String, trim: true, required: true, unique: true },
        password: { type: String, trim: true, required: true },
        token: {type: String, trim: false, required: false},
        email: { type: String, trim: true, required: true, unique: true },
        image: { type: String, trim: false, required: false, default: null },
        confirmed: {type: Boolean, trim: false, required: false, default: false },
        isAdmin: {type: Boolean, trim: false, required: false, default: false },
        isPremium: {type: Boolean, trim: false, required: false, default: false },
        project: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'projects'
        }],
        designs: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'designs'
        }],
        tickets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tickets'
        }]
    }
);

//Hacemos el hash de la contraseña en la prpopia generacion del modelo de usuario
userSchema.pre("save", async function(next){
  if (!this.isModified('password')){
        next();
  }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.passwordCheck = async function (formPassword) {
    return bcrypt.compare(formPassword, this.password)
}


const User = mongoose.model('users', userSchema);
module.exports = User;