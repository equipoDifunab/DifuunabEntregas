import './MainLayout.css';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from "react-router-dom";

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