import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'TU_SECRETO_JWT');
    req.user = decoded;
    next();
  } catch ( err ) {
    console.error('Error al verificar el token:', err);
    res.status(401).json({ error: 'Token inválido' });
  }
}

export function requireRole(rol) {
  return (req, res, next) => {
    if (req.user.rol !== rol) {
      return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }
    next();
  };
}