import app from "./Express.js";
import { connectDB } from "./DataBase.js";

const PORT = 3001;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

startServer();