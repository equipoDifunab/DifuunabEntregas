import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useCrearActividad() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    horaInicio: '07:00',
    horaFin: '08:00',
    ubicacion: '',
    cupos: '',
    categoria: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => {
    setDate(new Date(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const dataToSubmit = {
        ...formData,
        fecha: date || new Date(),
        cupos: Number(formData.cupos),
      };

      const response = await fetch('http://localhost:3001/api/actividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear actividad');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generarHoras = () => {
    return Array.from({ length: 32 }, (_, i) => {
      const hour = Math.floor((i + 14) / 2);
      const minute = (i + 14) % 2 === 0 ? '00' : '30';
      return `${hour.toString().padStart(2, '0')}:${minute}`;
    });
  };

  return {
    formData,
    isSubmitting,
    error,
    date,
    horasOptions: generarHoras(),
    handleInputChange,
    handleDateChange,
    handleSubmit,
  };
}