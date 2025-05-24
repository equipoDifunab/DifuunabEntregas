import express from 'express';
import mongoose from 'mongoose';
import Actividad from '../Models/Actividad.js';
import { crearActividad, obtenerActividades } from '../controllers/actividadesController.js';

const router = express.Router();

// Crear nueva actividad
router.post('/', crearActividad);

// Obtener todas las actividades
router.get('/', obtenerActividades);

// Obtener una actividad por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de actividad no válido' });
  }

  try {
    const actividad = await Actividad.findById(id);
    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.json(actividad);
  } catch (err) {
    console.error('Error al obtener actividad:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Actualizar una actividad por ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es un ObjectId válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de actividad no válido' });
  }

  try {
    const actividadActualizada = await Actividad.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!actividadActualizada) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    res.json(actividadActualizada);
  } catch (err) {
    console.error('Error al actualizar actividad:', err);
    res.status(400).json({ error: err.message });
  }
});

// Inscribirse en una actividad
router.post('/:id/inscripcion', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;

  // Validar datos requeridos
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  // Validar si el ID es válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de actividad no válido' });
  }

  try {
    // Buscar la actividad y verificar cupos disponibles
    const actividad = await Actividad.findById(id);
    
    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    // Verificar si hay cupos disponibles
    if (actividad.participantes.length >= actividad.cupos) {
      return res.status(400).json({ error: 'No hay cupos disponibles' });
    }

    // Verificar si el participante ya está inscrito
    const yaInscrito = actividad.participantes.some(p => p.email === email);
    if (yaInscrito) {
      return res.status(400).json({ error: 'Ya estás inscrito en esta actividad' });
    }

    // Agregar participante y actualizar cupos
    actividad.participantes.push({ nombre, email });
    
    // Guardar los cambios
    await actividad.save();

    res.status(200).json({
      mensaje: 'Inscripción exitosa',
      cuposRestantes: actividad.cupos - actividad.participantes.length
    });

  } catch (err) {
    console.error('Error en la inscripción:', err);
    res.status(500).json({ error: 'Error al procesar la inscripción' });
  }
});

export default router;