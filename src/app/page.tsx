'use client';
import { useState, useEffect } from 'react';
import { Assistant } from '@/types';
import { AssistantCard } from '@/components/AssistantCard';
import { AssistantModal } from '@/components/AssistantModal';
import { Toast } from '@/components/Toast';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Plus, Bot } from 'lucide-react';

export default function HomePage() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssistant, setEditingAssistant] = useState<Assistant | null>(null);

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('assistants_data');
    if (!saved) {
      const initialData: Assistant[] = [
        {
          id: "1",
          name: "Asistente de Ventas",
          language: "Español",
          tone: "Profesional",
          responseLength: { short: 30, medium: 50, long: 20 },
          audioEnabled: true,
          rules: "Eres un asistente especializado en ventas. Siempre se cordial y enfocate en identificar necesidades del cliente antes de ofrecer productos."
        },
        {
          id: "2",
          name: "Soporte Técnico",
          language: "Inglés",
          tone: "Amigable",
          responseLength: { short: 20, medium: 30, long: 50 },
          audioEnabled: false,
          rules: "Ayudas a resolver problemas técnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar."
        }
      ];
      localStorage.setItem('assistants_data', JSON.stringify(initialData));
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAssistants(initialData);
    } else {
      setAssistants(JSON.parse(saved));
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const handleSave = (data: Assistant) => {
    let updatedList;
    if (editingAssistant) {
      updatedList = assistants.map(a => a.id === editingAssistant.id ? { ...data, id: a.id } : a);
    } else {
      updatedList = [...assistants, data];
    }

    setAssistants(updatedList);
    localStorage.setItem('assistants_data', JSON.stringify(updatedList));
    setEditingAssistant(null);
    showToast(editingAssistant ? 'Asistente actualizado correctamente' : 'Asistente creado correctamente', 'success');
  };

  const confirmDelete = () => {
    if (!deleteId) return;

    const updated = assistants.filter(a => a.id !== deleteId);
    setAssistants(updated);
    localStorage.setItem('assistants_data', JSON.stringify(updated));
    setDeleteId(null);
    showToast('Asistente eliminado correctamente', 'success');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight flex items-center gap-3">
              <Bot className="text-blue-600 w-10 h-10" /> ASISTENTES IA
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-2 ml-1">Gestiona y entrena tus agentes virtuales</p>
          </div>
          <button
            onClick={() => { setEditingAssistant(null); setIsModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/30"
          >
            <Plus size={20} /> CREACIÓN
          </button>
        </header>

        {assistants.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot size={40} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No hay asistentes</h3>
            <p className="text-gray-500 mt-2">Comienza creando uno nuevo para automatizar tus interacciones.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-enter">
            {assistants.map(assistant => (
              <AssistantCard
                key={assistant.id}
                assistant={assistant}
                onDelete={(id) => setDeleteId(id)}
                onEdit={(a) => { setEditingAssistant(a); setIsModalOpen(true); }}
              />
            ))}
          </div>
        )}
      </div>

      <AssistantModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingAssistant(null); }}
        onSave={handleSave}
        initialData={editingAssistant}
        showToast={showToast}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        title="¿Eliminar asistente?"
        message="Esta acción no se puede deshacer. El asistente y toda su configuración se perderán permanentemente."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}