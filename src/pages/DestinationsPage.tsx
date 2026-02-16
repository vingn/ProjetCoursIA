import { motion } from 'framer-motion';
import Destinations from '../components/Destinations';

export default function DestinationsPage() {
  return (
    <div className="min-h-screen pt-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative py-20 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 container mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600"
          >
            Voyagez à Travers le Temps
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-slate-300 max-w-3xl mx-auto"
          >
            Explorez nos destinations exclusives et vivez des expériences uniques dans les époques les plus fascinantes de l'histoire
          </motion.p>
        </div>
      </motion.div>
      <Destinations />
    </div>
  );
}
