import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';

// NOTE : J'ai supprimé l'import de GoogleGenerativeAI car c'est le serveur qui gère ça maintenant.

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis Chronos, votre guide temporel personnel. Comment puis-je vous aider à planifier votre voyage à travers le temps ?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // --- CHANGEMENT MAJEUR ICI ---
      // Au lieu d'appeler Google en direct, on appelle votre fonction Netlify cachée
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      const data = await response.json();
      
      // On récupère la réponse générée par le serveur
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);

    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Désolé, une perturbation temporelle m'empêche de contacter le serveur (Vérifiez que le fichier netlify/functions/chat.js existe bien).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-full shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] backdrop-blur-xl bg-slate-900/95 border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-500 rounded-full">
                  <Bot className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-400">Chronos</h3>
                  <p className="text-xs text-slate-400">Guide Temporel</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* PLUS BESOIN DE DEMANDER LA CLE API ICI, C'EST AUTOMATIQUE */}
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start space-x-2 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.role === 'user' ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <UserIcon className="w-4 h-4 text-slate-900" />
                    ) : (
                      <Bot className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-amber-500 text-slate-900'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-700 rounded-full">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-amber-500/20">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 bg-slate-800 border border-amber-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
