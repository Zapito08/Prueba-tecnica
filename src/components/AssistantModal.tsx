'use client';
import React, { useState, useEffect } from 'react';
import { Assistant } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (assistant: Assistant) => void;
  initialData?: Assistant | null;
  showToast: (message: string, type: 'success' | 'error') => void;
}

export const AssistantModal = ({ isOpen, onClose, onSave, initialData, showToast }: Props) => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    language: 'Español',
    tone: 'Profesional',
    short: 30,
    medium: 50,
    long: 20,
    audioEnabled: false
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialData) {
        setFormData({
          name: initialData.name,
          language: initialData.language,
          tone: initialData.tone,
          short: initialData.responseLength.short,
          medium: initialData.responseLength.medium,
          long: initialData.responseLength.long,
          audioEnabled: initialData.audioEnabled
        });
      } else {
        setFormData({
          name: '',
          language: 'Español',
          tone: 'Profesional',
          short: 30,
          medium: 50,
          long: 20,
          audioEnabled: false
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialData?.id]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (formData.name.trim().length < 3) {
      showToast("El nombre debe tener al menos 3 caracteres", 'error');
      return;
    }
    setStep(2);
  };

  const handleSave = () => {
    const total = Number(formData.short) + Number(formData.medium) + Number(formData.long);
    if (total !== 100) {
      showToast(`La suma debe ser 100%. Actualmente es ${total}%`, 'error');
      return;
    }

    onSave({
      id: initialData ? initialData.id : Date.now().toString(),
      name: formData.name,
      language: formData.language as Assistant['language'],
      tone: formData.tone as Assistant['tone'],
      responseLength: {
        short: Number(formData.short),
        medium: Number(formData.medium),
        long: Number(formData.long)
      },
      audioEnabled: formData.audioEnabled,
      rules: initialData?.rules || ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-enter border border-white/20">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-green-500 text-white'}`}>
            {step > 1 ? '✓' : '1'}
          </div>
          <div className={`h-1 w-12 rounded-full transition-colors ${step === 2 ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step === 2 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' : 'bg-slate-100 text-slate-400'}`}>2</div>
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-slate-800 text-center">Datos Básicos</h2>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre del asistente *</label>
              <input
                type="text"
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Ej. Asistente de Ventas"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Idioma *</label>
              <select
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value as Assistant['language']})}
              >
                <option value="Español">Español</option>
                <option value="Inglés">Inglés</option>
                <option value="Portugués">Portugués</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tono *</label>
              <select
                className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-slate-50"
                value={formData.tone}
                onChange={(e) => setFormData({...formData, tone: e.target.value as Assistant['tone']})}
              >
                <option value="Profesional">Profesional</option>
                <option value="Formal">Formal</option>
                <option value="Casual">Casual</option>
                <option value="Amigable">Amigable</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={onClose} className="px-5 py-2.5 text-slate-500 hover:bg-slate-100 rounded-xl font-medium transition-colors">Cancelar</button>
              <button onClick={handleNext} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">Siguiente</button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-slate-800 text-center">Configuración</h2>
            <p className="text-sm text-slate-500 text-center bg-blue-50 p-2 rounded-lg border border-blue-100">La suma de porcentajes debe dar <span className="font-bold text-blue-700">100%</span></p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 text-center uppercase">Cortas</label>
                <input
                  type="number"
                  className="w-full border border-slate-200 rounded-xl p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  value={formData.short}
                  onChange={(e) => setFormData({...formData, short: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 text-center uppercase">Medias</label>
                <input
                  type="number"
                  className="w-full border border-slate-200 rounded-xl p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  value={formData.medium}
                  onChange={(e) => setFormData({...formData, medium: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-2 text-center uppercase">Largas</label>
                <input
                  type="number"
                  className="w-full border border-slate-200 rounded-xl p-3 text-center outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  value={formData.long}
                  onChange={(e) => setFormData({...formData, long: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer" onClick={() => setFormData({...formData, audioEnabled: !formData.audioEnabled})}>
              <input
                type="checkbox"
                id="audio"
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={formData.audioEnabled}
                onChange={(e) => setFormData({...formData, audioEnabled: e.target.checked})}/>
              <label htmlFor="audio" className="text-sm font-bold text-slate-700 cursor-pointer select-none">Habilitar respuestas de audio</label>
            </div>
            <div className="flex justify-between gap-3 mt-6">
              <button onClick={() => setStep(1)} className="px-5 py-2.5 text-slate-500 hover:bg-slate-100 rounded-xl font-medium transition-colors">Atrás</button>
              <button onClick={handleSave} className="flex-1 px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95">Guardar Asistente</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};