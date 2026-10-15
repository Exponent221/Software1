const getTareas = (req, res) => {
    res.status(200).json({ message: 'Obteniendo tareas' });
}
const createTareas = (req, res) => {
    res.status(200).json({ message: 'Creando tarea' });
}
const updateTarea = (req, res) => {
    res.status(200).json({ message: `Actualizando tarea con id ${req.params.id}` });
}
const deleteTarea = (req, res) => {
    res.status(200).json({ message: `Eliminando tarea con id ${req.params.id}` });
}

module.exports = {getTareas,createTareas, updateTarea,deleteTarea}