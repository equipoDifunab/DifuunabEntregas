import { Bell, UserCircle, Users } from "lucide-react"
import { Link } from "react-router-dom"
import "./Header.css"

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/onboarding" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
            </div>
            <span className="text-xl font-bold">DifUnab</span>
          </Link>
          <nav className="hidden md:flex md:gap-6">
            <Link to="/" className="text-sm font-medium text-primary">
              Inicio
            </Link>
            <Link to="/crear-actividad" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Crear Actividad
            </Link>
            <Link to="/participantes" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              <Users className="h-4 w-4 mr-1" />
              Tutores
            </Link>
            <Link to="/ayuda" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Ayuda
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            <span className="sr-only">Notificaciones</span>
          </div>
          <UserCircle className=" abosolute h-8 w-8 text-gray-600" />
        </div>
      </div>
    </header>
  )
}

export default Header;