const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');

const protect = async (req, res, next) => {

  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        //obtenemos el token
        token = req.headers.authorization.split(' ')[1];

        //verificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //obtenemos toda la info del usuario del token
        req.user = await User.findById(decoded.id_usuario).select('-password');

        next();
    }catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Acceso no autorizado, no se proporcionó un token válido');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Acceso no autorizado, no se proporcionó un token');
    }
}

module.exports = protect ;