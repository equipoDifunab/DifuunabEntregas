import { Calendar, Clock, MapPin, Users, Filter, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./body.css";

function Body() {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inscripcionActiva, setInscripcionActiva] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', email: '' });
  const [inscripcionError, setInscripcionError] = useState(null);
  const [inscripcionExitosa, setInscripcionExitosa] = useState(false);

  const fetchActividades = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/actividades');
      if (!response.ok) throw new Error('Error al obtener actividades');
      const data = await response.json();
      setActividades(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, []);

  const handleInscripcion = async (actividadId) => {
    setInscripcionActiva(actividadId);
    setInscripcionError(null);
    setInscripcionExitosa(false);
  };

  const handleSubmitInscripcion = async (e) => {
    e.preventDefault();
    setInscripcionError(null);

    try {
      const response = await fetch(`http://localhost:3001/api/actividades/${inscripcionActiva}/inscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Guardar el email del usuario para futuras referencias
      localStorage.setItem('userEmail', formData.email);

      setInscripcionExitosa(true);
      setFormData({ nombre: '', email: '' });
      fetchActividades(); // Actualizar la lista de actividades
      setTimeout(() => {
        setInscripcionActiva(null);
        setInscripcionExitosa(false);
      }, 2000);

    } catch (err) {
      setInscripcionError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><p>Cargando actividades...</p></div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-4">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Actividades Disponibles</h1>
          <p className="text-gray-500">Explora y únete a oportunidades laborales en instituciones educativas</p>
        </div>
        <button className="flex items-center gap-2 border rounded px-4 py-2 text-sm hover:bg-gray-100">
          <Filter className="h-4 w-4" />
          Filtrar
        </button>
      </div>

      {/* Modal de Inscripción */}
      {inscripcionActiva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Inscripción a la Actividad</h2>
            
            {inscripcionExitosa ? (
              <div className="text-green-600 text-center py-4">
                ¡Inscripción realizada con éxito!
              </div>
            ) : (
              <form onSubmit={handleSubmitInscripcion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                {inscripcionError && (
                  <div className="text-red-500 text-sm py-2">
                    {inscripcionError}
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setInscripcionActiva(null)}
                    className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Confirmar Inscripción
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Tarjetas */}
      <div className="grid gap-6 md:grid-cols-2">
        {actividades.map((actividad) => (
          <div key={actividad._id} className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Header con botón de edición */}
            <div className="p-4 border-b flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{actividad.nombre}</h2>
                <p className="text-sm text-gray-600 mt-1">{actividad.descripcion}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium bg-gray-100 text-gray-800 px-2 py-1 rounded">
                  {actividad.categoria}
                </span>
                <button 
                  onClick={() => navigate(`/editar-actividad/${actividad._id}`)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                  aria-label="Editar actividad"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  {new Date(actividad.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{actividad.horaInicio} - {actividad.horaFin}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>{actividad.ubicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>
                  Cupos: <span className="font-medium">
                    {actividad.cupos - (actividad.participantes?.length || 0)}
                  </span> disponibles
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-between items-center">
              <button
                onClick={() => navigate(`/editar-actividad/${actividad._id}`)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Pencil className="h-3 w-3" />
                Editar
              </button>
              <button
                className={`px-4 py-2 text-sm rounded ${
                  actividad.participantes?.length >= actividad.cupos
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                disabled={actividad.participantes?.length >= actividad.cupos}
                onClick={() => handleInscripcion(actividad._id)}
              >
                {actividad.participantes?.length >= actividad.cupos ? "Sin cupos" : "Inscribirse"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Body;