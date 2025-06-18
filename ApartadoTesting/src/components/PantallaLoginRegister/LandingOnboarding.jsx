import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje('');
    setError('');

    if (isRegistering && !rol) {
      setError('Por favor selecciona un rol');
      return;
    }

    const endpoint = isRegistering
      ? 'http://localhost:3001/api/usuarios/register'
      : 'http://localhost:3001/api/usuarios/login';

    const payload = isRegistering
      ? { nombre, email, password, rol }
      : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error');
      } else {
        setMensaje(data.mensaje || (isRegistering ? 'Registro exitoso' : 'Login exitoso'));
        // Guarda el token después de un login exitoso
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('rol', data.rol); // Guarda el rol para mostrar opciones según el usuario
          navigate("/"); // Redirige al home
        }
      }
    } catch (err) {
      setError('Error de conexión con el servidor: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {mensaje && <p className="text-sm text-green-600">{mensaje}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nombre de Usuario
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Selecciona tu Rol
                </label>
                <div className="flex gap-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setRol('tutor')}
                    className={`px-4 py-2 rounded ${
                      rol === 'tutor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    Tutor
                  </button>
                  <button
                    type="button"
                    onClick={() => setRol('coordinador')}
                    className={`px-4 py-2 rounded ${
                      rol === 'coordinador'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    Coordinador
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
          >
            {isRegistering ? 'Registrarse' : 'Entrar'}
          </button>
        </form>

        <div className="text-sm text-center text-gray-600">
          {isRegistering ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setMensaje('');
              setError('');
              setRol('');
            }}
            className="text-blue-600 hover:underline"
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
