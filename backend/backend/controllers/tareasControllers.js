const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    const tareas = await Tarea.find({user: req.user.id});
    res.status(200).json({tareas});
});
const createTareas = asyncHandler(async (req, res) => {
    if (!req.body.descripcion) {
        res.status(400);
        throw new Error('Por favor, agrega una descripción para la tarea');
    }

    const tarea = await Tarea.create({
        user: req.user.id,
        descripcion: req.body.descripcion,
    });

    res.status(201).json(tarea);
});
const updateTarea = asyncHandler(async (req, res) => {

    //Verificar que la tarea existe
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
        res.status(404);
        throw new Error('Tarea no encontrada');
    }

    //Verificar que el usuario que hace la petición es el mismo que creó la tarea
    if (tarea.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Usuario no autorizado');
    }else{
        const tareaUpdated = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(tareaUpdated);

    }
});

const deleteTarea = asyncHandler(async (req, res) => {
    //Verificar que la tarea existe
    const tarea = await Tarea.findById(req.params.id);

    if (!tarea) {
        res.status(404);
        throw new Error('Tarea no encontrada');
    }
    
//Verificar que el usuario que hace la petición es el mismo que creó la tarea
    if (tarea.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Usuario no autorizado');
    }else{
        await Tarea.deleteOne(tarea);
        res.status(200).json(tareaUpdated);

    }
});

module.exports = {getTareas , createTareas, updateTarea, deleteTarea}