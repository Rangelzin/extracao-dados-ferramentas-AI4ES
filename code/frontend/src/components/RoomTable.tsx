import React from 'react';
import { Edit2, Hotel } from 'lucide-react';
import { Badge } from './Badge';

interface RoomTableProps {
  quartos: any[];
  loading: boolean;
}

export const RoomTable: React.FC<RoomTableProps> = ({ quartos, loading }) => {
  if (loading) return <div className="text-center py-10">Carregando quartos...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-green-700">
        <Hotel size={20} /> Lista de Quartos
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-gray-100 text-gray-400 text-sm uppercase">
              <th className="pb-3">Número</th>
              <th className="pb-3">Tipo</th>
              <th className="pb-3">Preço</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {quartos.map((q) => (
              <tr key={q.numero} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 font-bold text-blue-600">#{q.numero}</td>
                <td className="py-4">{q.tipo}</td>
                <td className="py-4 font-medium">R$ {q.precoDiaria.toFixed(2)}</td>
                <td className="py-4">
                  <Badge status={q.disponibilidade} />
                </td>
                <td className="py-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Edit2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
