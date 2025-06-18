import { useState, useEffect } from 'react';
import { Calendar, Users, Search } from 'lucide-react';

export function ListaParticipantes() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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

    fetchActividades();
  }, []);

  const actividadesFiltradas = actividades.filter(actividad =>
    actividad.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    actividad.participantes.some(p => 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) return <div className="flex justify-center items-center h-64">Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Lista de Participantes por Actividad</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por actividad o participante..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {actividadesFiltradas.map(actividad => (
          <div key={actividad._id} className="border rounded-lg shadow-sm">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{actividad.nombre}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {actividad.categoria}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(actividad.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {actividad.participantes.length} / {actividad.cupos} participantes
                </div>
              </div>
            </div>

            <div className="p-4">
              {actividad.participantes.length > 0 ? (
                <div className="divide-y">
                  {actividad.participantes.map((participante, index) => (
                    <div key={index} className="py-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{participante.nombre}</p>
                        <p className="text-sm text-gray-600">{participante.email}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(participante.fechaInscripcion).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-4">No hay participantes inscritos</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 