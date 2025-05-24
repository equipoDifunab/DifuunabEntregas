// src/hooks/EditarActividad.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useEditarActividad(id) {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    fecha: '',
    horaInicio: '',
    horaFin: '',
    ubicacion: '',
    cupos: '',
    categoria: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Cargar actividad al montar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/actividades/${id}`);
        if (!response.ok) throw new Error('Error al cargar actividad PUNTO DE ENCUENTRO');

        const data = await response.json();
        setFormData({
          ...data,
          fecha: data.fecha.split('T')[0] // Formatear fecha para input
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validación básica
      if (formData.horaInicio >= formData.horaFin) {
        throw new Error('La hora final debe ser posterior a la inicial');
      }

      const response = await fetch(`http://localhost:3001/api/actividades/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cupos: Number(formData.cupos) // Asegurar que es número
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al actualizar');
      }

      navigate('/actividades', { state: { success: 'Actividad actualizada' } });
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit
  };
}