const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const createUser = asyncHandler(async (req, res) => {
    //desedtructurar el body
    const { nombre, email, password } = req.body;

    //validar que nos pasen los datos requeridos
    if (!nombre || !email || !password) {
        res.status(400);
        throw new Error('Faltan datos');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('Usuario ya existe');
    }

    //hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //crear el usuario
    const user = await User.create({
        nombre,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            password: user.password,
        });
    } else {
        res.status(400);
        throw new Error('No se pudieron guardar los datos del usuario, por favor intente de nuevo');
    }
})

const loginUser = asyncHandler(async (req, res) => {
    //desestructurar el body
    const { email, password } = req.body;

    //Verificar que el usuario exista
    const user = await User.findOne({ email });

    //verificar la contraseña
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: generarToken(user._id)
        });
    } else {
        res.status(401);
        throw new Error('Usuario o contraseña incorrectos');
    }
})

const datosUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
})

const generarToken = (id_usuario) => {
    return jwt.sign({ id_usuario }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { 
    createUser, loginUser, datosUser 
}