import { Link, useLocation } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-amber-600/20"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Clock className="w-8 h-8 text-amber-500 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              TimeTravel Agency
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className={`text-lg transition-colors ${
                isActive('/')
                  ? 'text-amber-500 font-semibold'
                  : 'text-slate-200 hover:text-amber-400'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/destinations"
              className={`text-lg transition-colors ${
                isActive('/destinations')
                  ? 'text-amber-500 font-semibold'
                  : 'text-slate-200 hover:text-amber-400'
              }`}
            >
              Nos Époques
            </Link>
            <Link
              to="/reservation"
              className={`text-lg transition-colors ${
                isActive('/reservation')
                  ? 'text-amber-500 font-semibold'
                  : 'text-slate-200 hover:text-amber-400'
              }`}
            >
              Réserver
            </Link>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
              <User className="w-5 h-5" />
              <span>Mon Espace</span>
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
