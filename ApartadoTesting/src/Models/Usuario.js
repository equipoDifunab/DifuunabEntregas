import mongoose, { Schema } from 'mongoose';

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['tutor', 'coordinador'], required: true }
}, {
  timestamps: true
});

export default mongoose.model('Usuario', usuarioSchema);