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
      content: 'Bonjour ! Je suis Chronos, votre guide temporel. Comment puis-je vous aider ?',
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
      // Appel direct à Hugging Face sans installation
      const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        {
          headers: { Authorization: "Bearer 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" },
          method: "POST",
          body: JSON.stringify({ 
            inputs: `[INST] Tu es Chronos, guide de l'agence TimeTravel. Réponds brièvement en français. Question: ${userMessage} [/INST]`,
          }),
        }
      );

      const result = await response.json();
      // On nettoie la réponse pour ne garder que le texte de l'IA
      const fullText = result[0].generated_text;
      const cleanText = fullText.split('[/INST]').pop()?.trim() || "Désolé, les archives temporelles sont inaccessibles.";

      setMessages((prev) => [...prev, { role: 'assistant', content: cleanText }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Erreur de connexion au flux temporel." },
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
              <span className="text-amber-400 font-bold">Chronos IA</span>
              <button onClick={() => setIsOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-slate-200'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-amber-500/20 flex space-x-2">
              <input 
                value={input} onChange={(e) => setInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-slate-800 border-none rounded p-2 text-white outline-none"
              />
              <button onClick={sendMessage} className="bg-amber-500 p-2 rounded text-slate-900"><Send className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
