import mongoose, { Schema } from 'mongoose'

const actividadSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  ubicacion: { type: String, required: true },
  cupos: { type: Number, required: true },
  categoria: { type: String, required: true },
  participantes: [{
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    fechaInscripcion: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
})

export default mongoose.model('Actividad', actividadSchema)
