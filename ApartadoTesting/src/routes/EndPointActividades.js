import express from 'express';
import mongoose from 'mongoose';
import Actividad from '../Models/Actividad.js';
import { crearActividad, obtenerActividades } from '../controllers/actividadesController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Solo coordinadores pueden crear actividades
router.post('/', requireAuth, requireRole('coordinador'), crearActividad);

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

// Actualizar una actividad por ID (solo coordinador)
router.put('/:id', requireAuth, requireRole('coordinador'), async (req, res) => {
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

// Eliminar una actividad por ID (solo coordinador)
router.delete('/:id', requireAuth, requireRole('coordinador'), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de actividad no válido' });
  }

  try {
    const actividadEliminada = await Actividad.findByIdAndDelete(id);
    if (!actividadEliminada) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }
    res.json({ mensaje: 'Actividad eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar actividad:', err);
    res.status(500).json({ error: 'Error al eliminar actividad' });
  }
});

// Solo tutores pueden inscribirse
router.post('/:id/inscripcion', requireAuth, requireRole('tutor'), async (req, res) => {
  const { id } = req.params;

  // Validar si el ID es válido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID de actividad no válido' });
  }

  try {
    const actividad = await Actividad.findById(id);

    if (!actividad) {
      return res.status(404).json({ error: 'Actividad no encontrada' });
    }

    // Verificar si hay cupos disponibles
    if (actividad.participantes.length >= actividad.cupos) {
      return res.status(400).json({ error: 'No hay cupos disponibles' });
    }

    // Agregar inscripción 
    actividad.participantes.push({});

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

