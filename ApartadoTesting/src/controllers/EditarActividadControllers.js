import Actividad from '../Models/Actividad.js';

export const actualizarActividad = async (req, res) => {
  const { id } = req.params;

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
};

export const obtenerActividadPorId = async (req, res) => {
  const { id } = req.params;

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
};
