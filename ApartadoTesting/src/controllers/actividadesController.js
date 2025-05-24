import Actividad from '../Models/Actividad.js';

export const crearActividad = async (req, res) => {
  try {
    const nuevaActividad = new Actividad(req.body);
    await nuevaActividad.save();
    res.status(201).json(nuevaActividad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const obtenerActividades = async (req, res) => {
  try {
    const actividades = await Actividad.find();
    res.json(actividades);
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    res.status(500).json({ error: 'Error al obtener actividades' });
  }
};