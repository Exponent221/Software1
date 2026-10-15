const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Obteniendo tareas' });
});
const createTareas = asyncHandler(async (req, res) => {
    if (!req.body.descripcion) {
        res.status(400);
        throw new Error('Por favor, agrega una descripción para la tarea');
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion
    });
    res.status(201).json(tarea);
});
const updateTarea = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Actualizando tarea con id ${req.params.id}` });
});
const deleteTarea = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Eliminando tarea con id ${req.params.id}` });
});

module.exports = {getTareas , createTareas, updateTarea, deleteTarea}