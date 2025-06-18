import express from 'express';
import Usuario from '../Models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const { rol } = req.body; // Obteniendo el rol del cuerpo de la solicitud
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Incluyendo el rol al crear un nuevo usuario
    const usuario = new Usuario({ nombre, email, password: hashedPassword, rol });
    await usuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ error: 'Usuario no encontrado' });
    const valid = await bcrypt.compare(password, usuario.password);
    if (!valid) return res.status(400).json({ error: 'Contraseña incorrecta' });

    // Generar token con el id y el rol
    const token = jwt.sign(
      { usuarioId: usuario._id, rol: usuario.rol }, // Incluye el rol aquí
      'TU_SECRETO_JWT', // Usa variable de entorno en producción
      { expiresIn: '2h' }
    );

    res.json({ mensaje: 'Login exitoso', token, usuarioId: usuario._id, rol: usuario.rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;