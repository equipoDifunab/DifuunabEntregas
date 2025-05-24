import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Clock, Users } from "lucide-react";
import "./Sidebar.css";

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [misActividades, setMisActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener el email del usuario del localStorage (asumiendo que lo guardamos al inscribirse)
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchMisActividades = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/actividades');
        if (!response.ok) throw new Error('Error al obtener actividades');
        const actividades = await response.json();
        
        // Filtrar solo las actividades donde el usuario está inscrito
        const actividadesInscritas = actividades.filter(actividad => 
          actividad.participantes.some(p => p.email === userEmail)
        );
        
        setMisActividades(actividadesInscritas);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchMisActividades();
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  const actividadesFiltradas = misActividades.filter((actividad) =>
    actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4 text-center">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <aside className="sidebar-container">
      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Buscar actividades..."
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-8 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Lista de actividades inscritas */}
      <div>
        <h2 className="mb-4 font-semibold text-gray-900">Mis Actividades Inscritas</h2>
        <div className="space-y-3">
          {actividadesFiltradas.length > 0 ? (
            actividadesFiltradas.map((actividad) => (
              <div key={actividad._id} className="rounded-lg border p-3 hover:bg-gray-50">
                <div className="flex justify-between">
                  <h3 className="font-medium">{actividad.nombre}</h3>
                  <span className="inline-block rounded-full px-2 py-1 text-xs font-semibold bg-green-100 text-green-800">
                    Inscrito
                  </span>
                </div>
                <div className="mt-2 space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(actividad.fecha).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{actividad.horaInicio} - {actividad.horaFin}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{actividad.ubicacion}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Cupos: {actividad.cupos - actividad.participantes.length} disponibles</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">
              {userEmail 
                ? "No te has inscrito en ninguna actividad"
                : "Inicia sesión para ver tus actividades"}
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;