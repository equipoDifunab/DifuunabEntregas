// src/components/EditarActividad.jsx
import { CalendarIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEditarActividad } from '../Funciones/EditarActividad.js';

export function EditarActividad() {
  const { id } = useParams();
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit
  } = useEditarActividad(id);

  if (loading) return <div className="text-center py-8">Cargando actividad...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Actividad</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Nombre */}
        <div>
          <label className="block mb-1 font-medium">Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label className="block mb-1 font-medium">Descripción *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded min-h-[100px]"
          />
        </div>

        {/* Fecha y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Fecha *</label>
            <div className="relative">
              <CalendarIcon className="absolute left-2 top-2.5 text-gray-400" />
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="w-full p-2 pl-8 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Categoría *</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Seleccionar...</option>
              <option value="CharlaEnFeria">CharlaEnFeria</option>
              <option value="ciencias">Ciencias</option>
            </select>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-4 py-2 border rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}