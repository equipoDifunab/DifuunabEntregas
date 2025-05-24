import express from 'express';
import cors from 'cors';
import actividadesRoutes from './routes/EndPointActividades.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/actividades', actividadesRoutes);

// Manejo de errores (opcional)
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal' });
    
});

export default app;