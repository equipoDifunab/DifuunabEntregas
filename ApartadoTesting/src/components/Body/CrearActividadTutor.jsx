import { CalendarIcon } from "lucide-react";
import { useCrearActividad } from "../Funciones/CrearActividad.js";

export function CrearActividadTutor() {
  const {
    formData,
    isSubmitting,
    error,
    date,
    horasOptions,
    handleInputChange,
    handleDateChange,
    handleSubmit,
    navigate,
  } = useCrearActividad();

  // Validación de horas
  const isHoraInvalida = formData.horaInicio && formData.horaFin && 
                        formData.horaInicio >= formData.horaFin;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crear Nueva Actividad</h2>
        <p className="text-gray-600 mt-1">
          Completa el formulario para registrar una nueva actividad tutorial.
        </p>
      </header>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección: Información básica */}
        <div className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Actividad 
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={formData.nombre}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="¿Que Actividad deseas Crear?"
            />
          </div>

          <div>
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción 
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              placeholder="Describe los objetivos y contenido de la actividad"
            />
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha 
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fecha"
                type="date"
                onChange={handleDateChange}
                min={new Date().toISOString().split("T")[0]}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {date && (
              <p className="mt-2 text-xs text-gray-500 italic">
                Seleccionado: {date.toLocaleDateString("es-ES", { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría 
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona una categoría</option>
              <option value="Ferias Universitarias">Ferias Universitarias</option>
              <option value="Charlas Universitarias">Charlas Universitarias</option>
              <option value="Evaluacion Ensaño PAES">Evaluacion Ensaño PAES</option>
              <option value="Voluntariados">Voluntariados</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="horaInicio" className="block text-sm font-medium text-gray-700 mb-1">
              Hora de inicio 
            </label>
            <select
              id="horaInicio"
              name="horaInicio"
              value={formData.horaInicio}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona hora</option>
              {horasOptions.map((hora) => (
                <option key={`inicio-${hora}`} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="horaFin" className="block text-sm font-medium text-gray-700 mb-1">
              Hora de fin 
            </label>
            <select
              id="horaFin"
              name="horaFin"
              value={formData.horaFin}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecciona hora</option>
              {horasOptions.map((hora) => (
                <option key={`fin-${hora}`} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isHoraInvalida && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md -mt-4">
            La hora de finalización debe ser posterior a la hora de inicio
          </div>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación 
            </label>
            <input
              id="ubicacion"
              name="ubicacion"
              type="text"
              value={formData.ubicacion}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Seleciona una ubicación" 
            />
          </div>

          <div>
            <label htmlFor="cupos" className="block text-sm font-medium text-gray-700 mb-1">
              Cupos Disponibles 
            </label>
            <input
              id="cupos"
              name="cupos"
              type="number"
              min="1"
              max="10"
              value={formData.cupos}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max:10"
            />
          </div>
        </div>


        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isHoraInvalida}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting || isHoraInvalida
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando...
              </span>
            ) : (
              "Crear Actividad"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}