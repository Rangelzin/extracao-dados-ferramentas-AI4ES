import React from 'react';
import type { Quarto } from '../types';
import { StatusQuarto } from '../types';
import { BedDouble, Edit2, Trash2 } from 'lucide-react';

interface QuartoListProps {
  quartos: Quarto[];
  onEdit: (quarto: Quarto) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  [StatusQuarto.LIVRE]: 'bg-green-50 text-green-700 border-green-200',
  [StatusQuarto.OCUPADO]: 'bg-red-50 text-red-700 border-red-200',
  [StatusQuarto.MANUTENCAO]: 'bg-amber-50 text-amber-700 border-amber-200',
  [StatusQuarto.LIMPEZA]: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};

export const QuartoList: React.FC<QuartoListProps> = ({ quartos, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Número</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Preço/Dia</th>
              <th>Status</th>
              <th className="text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {quartos.map((quarto) => (
              <tr key={quarto.id} className="group">
                <td className="font-medium text-slate-900">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                            {quarto.numero}
                        </div>
                    </div>
                </td>
                <td>
                    <span className="text-sm text-slate-600">{quarto.tipo}</span>
                </td>
                <td className="text-slate-500">{quarto.capacidade} <span className="text-xs">pessoas</span></td>
                <td className="font-medium text-slate-700">R$ {quarto.precoDiaria.toFixed(2)}</td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[quarto.status]}`}>
                    {quarto.status === 'LIVRE' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>}
                    {quarto.status === 'OCUPADO' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>}
                    {quarto.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(quarto)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Editar">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => onDelete(quarto.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {quartos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-500 bg-slate-50/50">
                  <div className="flex flex-col items-center gap-2">
                    <BedDouble size={32} className="text-slate-300" />
                    <p>Nenhum quarto encontrado.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
