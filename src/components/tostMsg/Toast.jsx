import { useEffect, useState } from "react";

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastStyles = () => {
    const baseStyles = `
      flex items-center p-4 mb-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out
      ${isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `;
    
    return toast.type === 'success' 
      ? `${baseStyles} bg-green-50 border-l-4 border-green-400`
      : `${baseStyles} bg-red-50 border-l-4 border-red-400`;
  };

  const getIconColor = () => toast.type === 'success' ? 'text-green-400' : 'text-red-400';
  const getTextColor = () => toast.type === 'success' ? 'text-green-800' : 'text-red-800';

  return (
    <div className={getToastStyles()}>
      <div className={`flex-shrink-0 ${getIconColor()}`}>
        {toast.type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
      </div>
      <div className={`ml-3 flex-1 ${getTextColor()}`}>
        <p className="text-sm font-medium">{toast.message}</p>
      </div>
      <button
        onClick={handleRemove}
        className={`ml-4 flex-shrink-0 ${getTextColor()} hover:opacity-70 transition-opacity`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast