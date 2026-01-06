import { Assistant } from '../types';
import { Pencil, Trash2, BrainCircuit, Mic, MicOff } from 'lucide-react';
import Link from 'next/link';

interface Props {
  assistant: Assistant;
  onDelete: (id: string) => void;
  onEdit: (assistant: Assistant) => void;
}

export const AssistantCard = ({ assistant, onDelete, onEdit }: Props) => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
            {assistant.name}
          </h3>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
              {assistant.language}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
              {assistant.tone}
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          <Link
            href={`/train/${assistant.id}`}
            className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
            title="Entrenar"
          >
            <BrainCircuit size={18} />
          </Link>

          <button
            onClick={() => onEdit(assistant)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            title="Editar"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(assistant.id)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Distribución de Respuesta</span>
          {assistant.audioEnabled ? (
            <div title="Audio habilitado" className="bg-green-100 p-1 rounded-full">
              <Mic size={12} className="text-green-600" />
            </div>
          ) : (
            <div title="Audio deshabilitado" className="bg-slate-100 p-1 rounded-full">
              <MicOff size={12} className="text-slate-400" />
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex-1 text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Corta</p>
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden"><div style={{width: `${assistant.responseLength.short}%`}} className="h-full bg-blue-400 rounded-full"></div></div>
          </div>
          <div className="flex-1 text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Media</p>
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden"><div style={{width: `${assistant.responseLength.medium}%`}} className="h-full bg-indigo-400 rounded-full"></div></div>
          </div>
          <div className="flex-1 text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Larga</p>
            <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden"><div style={{width: `${assistant.responseLength.long}%`}} className="h-full bg-purple-400 rounded-full"></div></div>
          </div>
        </div>
      </div>
    </div>
  );
};