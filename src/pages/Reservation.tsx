import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, CheckCircle, Sparkles } from 'lucide-react';

const destinations = [
  { id: 1, name: 'Paris 1889 - Belle Époque', price: 15000 },
  { id: 2, name: 'Florence 1504 - Renaissance', price: 18500 },
  { id: 3, name: 'Crétacé -65M - Dinosaures', price: 25000 },
];

export default function Reservation() {
  const [formData, setFormData] = useState({
    destination: '',
    date: '',
    travelers: '1',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ destination: '', date: '', travelers: '1' });
    }, 5000);
  };

  const selectedDest = destinations.find((d) => d.id === Number(formData.destination));
  const totalPrice = selectedDest ? selectedDest.price * Number(formData.travelers) : 0;

  return (
    <div className="min-h-screen pt-24 px-6 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto max-w-4xl py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
            Réservez Votre Voyage Temporel
          </h1>
          <p className="text-xl text-slate-300">
            Préparez-vous à vivre l'aventure de votre vie
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-lg bg-slate-800/50 border border-amber-500/30 rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <CheckCircle className="w-24 h-24 text-amber-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Réservation Confirmée !
            </h2>
            <p className="text-xl text-slate-300 mb-2">
              Bienvenue dans l'aventure temporelle
            </p>
            <p className="text-slate-400">
              Vous allez recevoir votre chronogramme de voyage par transmission temporelle
            </p>
            <div className="mt-8 flex justify-center space-x-2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -100, opacity: 0 }}
                  transition={{ delay: i * 0.05, duration: 1 }}
                >
                  <Sparkles className="w-6 h-6 text-amber-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="backdrop-blur-lg bg-slate-800/50 border border-amber-500/20 rounded-2xl p-8 shadow-2xl"
          >
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-slate-200 font-semibold mb-3">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>Destination Temporelle</span>
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-amber-500/30 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="">Sélectionnez une époque</option>
                  {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.name} - {dest.price.toLocaleString()}€
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-200 font-semibold mb-3">
                  <Calendar className="w-5 h-5 text-amber-500" />
                  <span>Date de Départ</span>
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-slate-900 border border-amber-500/30 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-slate-200 font-semibold mb-3">
                  <Users className="w-5 h-5 text-amber-500" />
                  <span>Nombre de Voyageurs</span>
                </label>
                <select
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900 border border-amber-500/30 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'voyageur' : 'voyageurs'}
                    </option>
                  ))}
                </select>
              </div>

              {totalPrice > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-lg">Prix Total</span>
                    <span className="text-3xl font-bold text-amber-400">
                      {totalPrice.toLocaleString()}€
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    Inclus: Transport temporel, guide expert, assurance multidimensionnelle
                  </p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 text-lg font-bold rounded-lg shadow-xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-300"
              >
                Confirmer la Réservation
              </motion.button>
            </div>
          </motion.form>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-6 text-center"
        >
          <div className="p-6 backdrop-blur-lg bg-slate-800/30 border border-amber-500/20 rounded-xl">
            <div className="text-3xl font-bold text-amber-500 mb-2">100%</div>
            <div className="text-slate-300">Sécurité Temporelle</div>
          </div>
          <div className="p-6 backdrop-blur-lg bg-slate-800/30 border border-amber-500/20 rounded-xl">
            <div className="text-3xl font-bold text-amber-500 mb-2">24/7</div>
            <div className="text-slate-300">Support Chronologique</div>
          </div>
          <div className="p-6 backdrop-blur-lg bg-slate-800/30 border border-amber-500/20 rounded-xl">
            <div className="text-3xl font-bold text-amber-500 mb-2">5★</div>
            <div className="text-slate-300">Expérience Premium</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
