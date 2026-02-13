import React from 'react';

interface BadgeProps {
  status: string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  const getColors = (s: string) => {
    switch (s) {
      case 'Livre': return 'bg-green-100 text-green-700';
      case 'Ocupado': return 'bg-red-100 text-red-700';
      case 'Manutenção': return 'bg-yellow-100 text-yellow-700';
      case 'Limpeza': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getColors(status)}`}>
      {status}
    </span>
  );
};
