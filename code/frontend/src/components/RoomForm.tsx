import React, { useState } from 'react';
import { TipoQuarto, TipoCama } from '../domain-entities';
import { Plus } from 'lucide-react';

interface RoomFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const RoomForm: React.FC<RoomFormProps> = ({ onSuccess, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    numero: '',
    capacidade: 2,
    tipo: TipoQuarto.BASICO,
    precoDiaria: 100,
    temFrigobar: false,
    temCafeIncluso: false,
    temArCondicionado: false,
    temTV: false,
    tiposCama: [TipoCama.SOLTEIRO]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onSuccess();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-8 animate-in slide-in-from-top duration-300">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700">
        <Plus size={20} /> Cadastrar Novo Quarto
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input 
          placeholder="Número do Quarto" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" 
          onChange={e => setFormData({...formData, numero: e.target.value})}
          required
        />
        <input 
          type="number" 
          placeholder="Capacidade" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setFormData({...formData, capacidade: Number(e.target.value)})}
        />
        <select 
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setFormData({...formData, tipo: e.target.value as TipoQuarto})}
        >
          {Object.values(TipoQuarto).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input 
          type="number" 
          placeholder="Preço Diária" 
          className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={e => setFormData({...formData, precoDiaria: Number(e.target.value)})}
        />
        
        <div className="md:col-span-3 flex flex-wrap gap-4 bg-blue-50 p-4 rounded-lg">
          {['temFrigobar', 'temCafeIncluso', 'temArCondicionado', 'temTV'].map(key => (
            <label key={key} className="flex items-center gap-2 cursor-pointer capitalize">
              <input 
                type="checkbox" 
                onChange={e => setFormData({...formData, [key]: e.target.checked})} 
              /> {key.replace('tem', '').replace(/([A-Z])/g, ' $1')}
            </label>
          ))}
        </div>

        <div className="md:col-span-3 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="text-gray-500 px-4">Cancelar</button>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all">Salvar Quarto</button>
        </div>
      </form>
    </div>
  );
};
