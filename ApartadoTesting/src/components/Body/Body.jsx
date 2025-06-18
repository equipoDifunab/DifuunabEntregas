import { Calendar, Clock, MapPin, Users, Filter, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./body.css";

function Body() {
  const navigate = useNavigate();
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3001/api/actividades/${actividadId}/inscripcion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({}) // Ya no se envían datos de usuario
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      fetchActividades(); // Actualizar cupos
      alert("¡Inscripción exitosa!");
    } catch (err) {
      alert("Error al inscribirse: " + err.message);
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

      {/* Tarjetas */}
      <div className="grid gap-6 md:grid-cols-2">
        {actividades.map((actividad) => (
          <div key={actividad._id} className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Header */}
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
