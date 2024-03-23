const User = require('./users.model');
const {generateToken} = require('../../utils/jwt/jwt.js');
const {generateID} = require("../../utils/generateID/generateID.js")
const JwtUtils = require('../../utils/jwt/jwt.js');
const { transporter } = require('../../utils/nodemailer-config');
const jwt = require('jsonwebtoken');




const register = async (req, res, next) => {

    try {
        
        //Si no coincide con de 8 a 12 y que ocntenga mayusculas, minusculas y caracteres especiales da error.
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,12}$/;

        //Como campos obligatorios
        const {name, surname, email, username, password} = req.body
        if(name === ""|| email === "" || surname === "" || username === ""){
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
        user.username = username;
        user.token = generateID();
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
            const error = new Error("¡El correo ya existe, puedes solicitar crear una nueva contraseña si la has olvidado!");
            return res.status(401).json({msg: error.message})
        }
        await user.save();

        //Configuración del email que se envía.
        await transporter.sendMail({
            from: '"Equipo UP_CODE " <//emisor>', // Emisor
            to: `${req.body.email}`, // Remitente
            subject: "Confirmación registro en UP_CODE", // Asunto
            text: "Hello world!", // Texto plano
            html: `<b>Bienvenido a la aplicacion! ${req.body.name}, solo te queda un paso por realizar, pincha en el siguiente enláce para completar tu registro: <a href="http://localhost:8084/api/users/confirm-user/${user.token}">Confirmar usuario<a> </b>`, // Cuerpo html
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
        //userConfirm.token = "";
        await userConfirm.save()

        //Hay que sustituir esto por el link del login cuando lo tengamos enrutado:
        //return res.redirect('http://ruta-de-tu-pagina-de-login');
        return res.status(200).json({msg: "¡Usuario Confirmado!"})
    } catch (error) {
        return res.status(404).json({msg: err.message})
    }
}

const login = async (req, res, next) => {//Por ahora almaceno el token en la informacion del usuario para las pruebas en postman de rutas protegidas

    try {
        // Comprobamos que existe el email para logarse
        const user = await User.findOne({ email: req.body.email })

        //Si el usuario no existe no le deja logarse
        if(!user){
         const error = new Error("El usuario no está registrado");
         return res.status(401).json({msg: error.message})
        }

        //Comprobamos la contraseña con respecto a la contraseña hasheada del user
        if( !await user.passwordCheck(req.body.password)){
            const error = new Error("El correo electronico o la contraseña no son correctos, revisalos e intenta nuevamente");
            return res.status(401).json({msg: error.message})
        }

        //Comprobamos si esta confirmado mediante email el usuario
        if (!user.confirmed){
            const error = new Error("¡Aun no has confirmado tu cuenta!");
            return res.status(401).json({msg: error.message})
        }
        if (await user.passwordCheck(req.body.password)) {
                 // Generamos el Token usando en fichero de jwt que hemos importado
            const token = generateToken(user._id, user.email);
            user.token = token;
            console.log(user)
            // await user.save()
            // Devolvemos el Token al Front
            return res.json({
                name: user.name, 
                surname: user.surname,
                username: user.username,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                isPremium: user.isPremium,
                project: user.project,
                designs: user.designs,
                tickets: user.tickets,
                token: token
            });
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

//Funcion que coge la informacion del usuario a travs del token y comrpueba si es admin
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


//Funcion que usa el token para obtener la informaciond el usuario
const getUserByToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is missing' });
        }

        const tokenWithoutBearer = token.replace('Bearer ', '');
        
        const decodedToken = jwt.verify(tokenWithoutBearer, 'KVGfjghdjJJKHLH-43543T-VJHFDSKVJHSFDJK-45646FDGVF');

        // Suponiendo que el token contiene el ID del usuario
        const userId = decodedToken.id;
        const userLogued = await User.findOne({ _id: userId });

        if (!userLogued) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(userLogued);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



//La funcion utiliza el id del usuario para otener los datos y te permite actualizar su información
const patchUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, name, surname } = req.body;
        let image = req.file ? req.file.path : null;
        const userToUpdate = {
            username,
            name,
            surname
        }
        if (image) {
            userToUpdate.image = image
        }
        const updatedUser = await User.findByIdAndUpdate(id, userToUpdate, { new: true });
        
        return res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



module.exports = { register, login, logout, confirm, newPassword, isAdmin, getUserByToken, patchUser }