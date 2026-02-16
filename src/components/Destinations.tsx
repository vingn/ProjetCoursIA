import { motion } from 'framer-motion';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    description: 'Découvrez l\'inauguration de la Tour Eiffel et l\'âge d\'or de la culture parisienne. Rencontrez les impressionnistes dans leurs ateliers.',
    image: 'https://i.imgur.com/OMh1I0N.jpeg',
    price: '15 000',
    highlights: ['Tour Eiffel', 'Exposition Universelle', 'Cafés Artistiques'],
  },
  {
    id: 2,
    title: 'Florence 1504',
    subtitle: 'La Renaissance',
    description: 'Assistez à la création du David de Michel-Ange et plongez dans l\'effervescence artistique de la Renaissance italienne.',
    image: 'https://i.imgur.com/9eJAQNl.png',
    price: '99 500',
    highlights: ['Michel-Ange', 'Art Renaissance', 'Palais Médicis'],
  },
  {
    id: 3,
    title: 'Crétacé -65M',
    subtitle: 'Ère des Dinosaures',
    description: 'Une aventure préhistorique unique pour observer les créatures les plus majestueuses ayant foulé notre planète. Sécurité maximale garantie.',
    image: 'https://i.imgur.com/dP9B3eg.jpeg',
    price: '5 000',
    highlights: ['Tyrannosaurus Rex', 'Nature Sauvage', 'Aventure Extrême'],
  },
];

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Nos Destinations Temporelles
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choisissez parmi nos voyages exclusifs à travers les époques les plus fascinantes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-lg bg-slate-800/50 border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/30"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                <div className="absolute top-4 right-4 px-4 py-2 bg-amber-500 text-slate-900 rounded-full font-bold text-sm">
                  {dest.price}€
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-3xl font-bold text-amber-400 mb-1">{dest.title}</h3>
                <p className="text-lg text-amber-300/70 mb-3">{dest.subtitle}</p>
                <p className="text-slate-300 mb-4 leading-relaxed">{dest.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {dest.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 bg-amber-500/10 text-amber-400 text-sm rounded-full border border-amber-500/30"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-slate-400 mb-6">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>7-14 jours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Max 6 pers.</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Premium</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/reservation')}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-lg font-semibold hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 group-hover:scale-105"
                >
                  Réserver maintenant
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
