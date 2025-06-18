import app from "./Express.js";
import { connectDB } from "./DataBase.js";

//Componete Principal para la creacion del Servidor en un puerto especifico de Manera Local
// Para usarlo Los Paso son activar DB para luego junto a Node ejecutarlo
const PORT = 3001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

startServer();