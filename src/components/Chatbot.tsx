import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour ! Je suis Chronos, votre guide de TimeTravel Agency. Vers quelle époque souhaitez-vous voyager ?',
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
    const lowerMsg = userMessage.toLowerCase();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulation d'une IA locale (Moteur de réponse intelligent)
    setTimeout(() => {
      let response = "C'est une demande fascinante. En tant qu'IA de l'agence, je peux vous dire que cette période nécessite une préparation spécifique. Souhaitez-vous des détails sur nos destinations actuelles ?";

      if (lowerMsg.includes("paris") || lowerMsg.includes("1889")) {
        response = "Ah, la Belle Époque ! Pour 15 000€, je vous installe en première loge pour l'inauguration de la Tour Eiffel. Un choix très distingué.";
      } else if (lowerMsg.includes("dino") || lowerMsg.includes("crétacé") || lowerMsg.includes("t-rex")) {
        response = "Le Crétacé ! Un voyage à 25 000€. Sensations fortes garanties. Nous fournissons une cage de protection en titane renforcé.";
      } else if (lowerMsg.includes("florence") || lowerMsg.includes("1504") || lowerMsg.includes("renaissance")) {
        response = "Florence en 1504 est un joyau. Pour 18 500€, vous pourrez observer Michel-Ange en plein travail. C'est notre voyage le plus culturel.";
      } else if (lowerMsg.includes("prix") || lowerMsg.includes("cher") || lowerMsg.includes("combien")) {
        response = "Nos tarifs sont premium : Paris (15k€), Florence (18.5k€) et le Crétacé (25k€). Le luxe n'a pas d'âge, mais il a un coût !";
      } else if (lowerMsg.includes("hello") || lowerMsg.includes("bonjour") || lowerMsg.includes("salut")) {
        response = "Salutations voyageur ! Je suis Chronos. Je connais chaque seconde de l'histoire humaine. Où allons-nous aujourd'hui ?";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 p-4 bg-amber-500 text-slate-900 rounded-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 h-[500px] bg-slate-900 border border-amber-500/30 rounded-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-amber-500/20 flex justify-between items-center bg-amber-500/10">
              <span className="text-amber-400 font-bold">Chronos IA (Local)</span>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-200'}`}>
                    {m.content}
                  </div>
                </div>
              </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-amber-500/20 flex space-x-2">
              <input 
                value={input} onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Discutez avec Chronos..."
                className="flex-1 bg-slate-800 border-none rounded p-2 text-white outline-none"
              />
              <button onClick={sendMessage} className="bg-amber-500 p-2 rounded text-slate-900">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
