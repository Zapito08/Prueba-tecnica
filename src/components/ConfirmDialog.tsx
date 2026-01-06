interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4 animate-enter">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-white/20">
        <h3 className="text-xl font-black text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-slate-500 hover:bg-slate-100 rounded-xl font-bold transition-colors text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-200 transition-all active:scale-95 text-sm"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};