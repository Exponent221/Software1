const mongoose = require('mongoose');

const usersSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, 'Por favor, agrega un nombre']
        },
        email: {
            type: String,
            required: [true, 'Por favor, agrega un correo electrónico'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Por favor, agrega una contraseña']
        },
        esAdmin: {
            type: Boolean,
            default: false
    }
    },{
        timestamps: true
    })

    module.exports = mongoose.model('User', usersSchema)