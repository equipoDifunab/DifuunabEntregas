import './MainLayout.css';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from "react-router-dom";

// Componente principal del layout
// Componente muy relevante uso un metodo de event listener para la mayoria de los componentes y este no es la excepcion
// La idea es que tengo disposiciones de la paginas fijas pero el contenido en pantalla cambiara gracias outlet
//a futuro se debera trabajar con Tokens de Usuarios 
const MainLayout = () => {
    return (
        <div className="Main-container">
            {/* Header */}
            <Header />

            {/* Contenido principal */}
            <div className="Main-content">
                {/* Sidebar */}
                <div className="Sidebar-container">
                    <Sidebar />
                </div>

                {/* Aquí se muestra el contenido de la ruta actual */}
                <div className="Body-container">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;