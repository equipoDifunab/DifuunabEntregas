import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";
import Body from "../components/Body/Body.jsx";
import { CrearActividadTutor } from "../components/Body/CrearActividadTutor.jsx";
import { EditarActividad } from "../components/Body/EditarActividades.jsx";
import { ListaParticipantes } from "../components/Body/ListaParticipantes.jsx";
import LandingOnboarding from "../components/PantallaLoginRegister/LandingOnboarding.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/onboarding" element={<LandingOnboarding />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Body />} />
        <Route path="crear-actividad" element={<CrearActividadTutor />} />
        <Route path="editar-actividad/:id" element={<EditarActividad />} />
        <Route path="participantes" element={<ListaParticipantes />} />
        
      </Route>
    </Routes>
  );
}