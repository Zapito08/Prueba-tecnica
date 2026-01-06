'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Assistant } from '@/types';
import { Toast } from '@/components/Toast';
import { ArrowLeft, Send, Save, Bot, User, Eraser } from 'lucide-react';

export default function TrainPage() {
  const { id } = useParams();
  const router = useRouter();

  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [rules, setRules] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const loadData = () => {
      const saved = localStorage.getItem('assistants_data');
      if (saved) {
        const list = JSON.parse(saved);
        const found = list.find((a: Assistant) => a.id === String(id));
        if (found) {
          setAssistant(found);
          setRules(found.rules || '');
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, [id]);

  const handleSaveTraining = () => {
    const saved = localStorage.getItem('assistants_data');
    if (saved && assistant) {
      const list = JSON.parse(saved);
      const updatedList = list.map((a: Assistant) =>
        a.id === String(id) ? { ...a, rules: rules } : a
      );
      localStorage.setItem('assistants_data', JSON.stringify(updatedList));
      setToast({ message: '¡Entrenamiento guardado exitosamente!', type: 'success' });
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const mockResponses = [
        "Entendido, ¿en qué más puedo ayudarte?",
        "Claro, con gusto te ayudo con eso.",
        "¿Podrías darme más detalles sobre tu consulta?",
        "Perfecto, he registrado esa información.",
        "Interesante punto, cuéntame más sobre eso."
      ];
      const randomReply = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: randomReply
      }]);
      setIsTyping(false);
    }, 1500);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center font-sans text-slate-500">Cargando asistente...</div>;
  }

  if (!assistant) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 font-sans text-slate-600">
        <p>El asistente no existe o fue eliminado.</p>
        <button onClick={() => router.push('/')} className="text-blue-600 font-bold hover:underline">Volver al inicio</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 font-sans text-slate-800 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 md:px-8 md:py-6 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10 border-b border-slate-200/50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/')}
            className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-blue-600 hover:scale-105 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              Entrenar: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{assistant.name}</span>
            </h1>
            <p className="text-sm text-slate-500 font-medium ml-1">{assistant.language} • {assistant.tone}</p>
          </div>
        </div>
        
        <button
            onClick={handleSaveTraining}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-200 active:scale-95"
          >
            <Save size={20} /> <span className="hidden md:inline">Guardar Cambios</span>
        </button>
      </header>

      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 h-[calc(100vh-100px)]">
        {/* Editor Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-white/50 flex flex-col gap-4 animate-enter h-full">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Bot size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-800">Instrucciones del Sistema</h2>
              <p className="text-xs text-slate-400">Define la personalidad y reglas de tu IA</p>
            </div>
          </div>
          <textarea
            value={rules}
            onChange={(e) => setRules(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm leading-relaxed font-mono text-slate-600" 
            placeholder="Ej. Eres un asistente experto en soporte técnico. Tu tono es amable y paciente. Siempre debes preguntar por el número de ticket antes de comenzar..."
          ></textarea>
          <div className="flex justify-between items-center text-xs text-slate-400 px-2">
             <span>Markdown soportado</span>
             <span>{rules.length} caracteres</span>
          </div>
        </div>

        {/* Chat Preview Section */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-white/50 flex flex-col overflow-hidden animate-enter h-full" style={{animationDelay: '0.1s'}}>
          <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
             <h3 className="font-bold text-slate-700 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               Vista Previa en Vivo
             </h3>
             <button onClick={() => setMessages([])} className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1">
               <Eraser size={14} /> Limpiar
             </button>
          </div>

          <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 bg-slate-50/30">
             {messages.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                 <Bot size={48} className="text-slate-300 mb-4" />
                 <p className="text-slate-500 font-medium">El chat está vacío</p>
                 <p className="text-slate-400 text-sm">Envía un mensaje para probar las instrucciones</p>
               </div>
             )}
             {messages.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'}`}>
                     {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                   </div>
                   <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                     m.role === 'user' 
                       ? 'bg-blue-600 text-white rounded-tr-none' 
                       : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                   }`}>
                     {m.content}
                   </div>
                 </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[85%]">
                   <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                     <Bot size={14} />
                   </div>
                   <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center h-[46px]">
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                     <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                   </div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-none outline-none px-4 text-slate-700 placeholder:text-slate-400"
                placeholder="Escribe un mensaje..."
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-3 rounded-xl transition-all shadow-md shadow-blue-200"
              >
                <Send size={18}/>
              </button>
            </div>
          </div>
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}