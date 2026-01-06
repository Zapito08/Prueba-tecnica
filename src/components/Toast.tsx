import { CheckCircle, AlertCircle, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl animate-enter border ${
      type === 'success' ? 'bg-white text-slate-700 border-green-100' : 'bg-white text-slate-700 border-red-100'
    }`}>
      {type === 'success' ? <CheckCircle className="text-green-500" size={24} /> : <AlertCircle className="text-red-500" size={24} />}
      <p className="font-semibold text-sm">{message}</p>
      <button onClick={onClose} className="ml-2 text-slate-400 hover:text-slate-600 transition-colors">
        <X size={18} />
      </button>
    </div>
  );
};