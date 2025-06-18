import mongoose, { Schema } from 'mongoose'

// Como primer entrega quiero enfatizar en Las Actividades el Primer Model sera Activiadad.js
const actividadSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha: { type: String, required: true },
  horaInicio: { type: String, required: true },
  horaFin: { type: String, required: true },
  ubicacion: { type: String, required: true },
  cupos: { type: Number, required: true },
  categoria: { type: String, required: true },
  participantes: {
    type: [Schema.Types.Mixed],
    default: []                 
  }
}, {
  timestamps: true
})

export default mongoose.model('Actividad', actividadSchema)
