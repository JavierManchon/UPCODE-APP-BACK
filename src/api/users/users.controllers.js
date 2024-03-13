const User = require('./users.model');
const {generateToken} = require('../../utils/jwt/jwt.js');
const {generateID} = require("../../utils/generateID/generateID.js")
const JwtUtils = require('../../utils/jwt/jwt.js');
const { transporter } = require('../../utils/nodemailer-config');



const register = async (req, res, next) => {

    try {
       
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;

        const {name, email, surname, password} = req.body
        if(name === ""|| email === "" || surname === ""){
            return res.status(401).json("¡No puedes dejar campos vacios!")
        }
        if(password.length < 8){
            return res.status(401).json("¡La contraseña es demasiado corta!")
        }
        if(!regexp.test(password)){
            return res.status(401).json("¡El password no cumple con los requisitos minimos de seguridad!. Recuerda que debe tener de 8 a 12 caracteres y que debe incluir minimo: Un caracter en mayúscula, uno en minúscula, un número y un carácter especial")
        }
        

        const user = new User();
        user.name = name;
        user.email = email;
        user.surname = surname;
        user.password = password;
        user.token = generateID();
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
            const error = new Error("¡El correo ya existe, puedes solicitar crear una nueva contraseña si la has olvidado!");
            return res.status(401).json({msg: error.message})
        }
        await user.save();

        await transporter.sendMail({
            from: '"Cristian Farriol " <//emisor>', // sender address
            to: `${req.body.email}`, // list of receivers
            subject: "Enviado desde nodemailer ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<b>Bienvenido a la aplicacion! ${req.body.name}, solo te queda un paso por realizar, pincha en el siguiente enláce para completar tu registro: <a href="http://localhost:4200/auth/confirm-user/${user.token}">Confirmar usuario<a> </b>`, // html body
          });
        return res.status(201).json({msg: 'Revisa tu correo. Se te ha enviado un enlace de confirmación'})

    } catch (error) {
        const err = new Error("Ha ocurrido un error con el registro.");
        return res.status(404).json({msg: err.message})
    }
}

const confirm = async (req, res, next) => {
    const {token} = req.params;
    console.log(token)
    const userConfirm = await User.findOne({token})
    if (!userConfirm){
        const error = new Error("Token no valido")
        return res.status(403).json({msg: error.message})
    }

    try {
        userConfirm.confirmed = true;
        userConfirm.token = "";
        await userConfirm.save()
        return res.status(200).json({msg: "¡Usuario Confirmado!"})
    } catch (error) {
        return res.status(404).json({msg: err.message})
    }
}

const login = async (req, res, next) => {

    try {
        // Comprobamos que existe el email para logarse
        const user = await User.findOne({ email: req.body.email });

        if(!user){
         const error = new Error("El usuario no está registrado");
         return res.status(401).json({msg: error.message})
        }

        if( !await user.passwordCheck(req.body.password)){
            const error = new Error("El correo electronico o la contraseña no son correctos, revisalos e intenta nuevamente");
            return res.status(401).json({msg: error.message})
        }

        if (!user.confirmed){
            const error = new Error("¡Aun no has confirmado tu cuenta!");
            return res.status(401).json({msg: error.message})
        }
        if (await user.passwordCheck(req.body.password)) {
                 // Generamos el Token
            const token = generateToken(user._id, user.email);
            user.token = token;
            await user.save()
            // Devolvemos el Token al Frontal
            return res.json(user);
        } else {
            const error = new Error("El correo electronico o la contraseña no son correctos, revisalos e intenta nuevamente");
            return res.status(401).json({msg: error.message})
        }
           

    } catch (error) {
        const err = new Error("Ha ocurrido un error con el inicio de sesión.");
        return res.status(401).json({msg: error.message})
    }
}

const logout = async (req, res, next) => {
    try {
        // Te elimina el token -> Es decir te lo devuelve en null
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(error)
    }
}


const newPassword = async (req, res, next) => {

    const {token} = req.params;
    const {password} = req.body;
    
    const user = await User.findOne({token})
    
    if (user){
        user.password = password;
        user.token = "";
        await user.save();
        res.json({msg: "Contraseña actualizada correctamente"})
    }else {
        const error = new Error("El Token no es valido");
        return res.status(404).json({msg: error.message})
    }

    try {
        
    } catch (error) {
        
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const parsedToken = token.replace('Bearer ', '');
        const user = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET)
        const userLogued = await User.findById(user.id);
        return res.status(201).json(userLogued.isAdmin)
    } catch (error) {
        return next(error)
    }
}



module.exports = { register, login, logout, confirm,  newPassword, isAdmin}