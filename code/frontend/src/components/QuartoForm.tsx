import React, { useState, useEffect } from 'react';
import type { Quarto } from '../types';
import { TipoQuarto, TipoCama } from '../types';

interface QuartoFormProps {
  initialData?: Quarto;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const QuartoForm: React.FC<QuartoFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    numero: '',
    capacidade: 1,
    tipo: TipoQuarto.BASICO,
    precoDiaria: 0,
    camas: [{ tipo: TipoCama.SOLTEIRO, quantidade: 1 }]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        numero: initialData.numero,
        capacidade: initialData.capacidade,
        tipo: initialData.tipo,
        precoDiaria: initialData.precoDiaria,
        camas: initialData.camas.length > 0 ? initialData.camas : [{ tipo: TipoCama.SOLTEIRO, quantidade: 1 }]
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCamaChange = (index: number, field: string, value: any) => {
      const newCamas = [...formData.camas];
      (newCamas[index] as any)[field] = value;
      setFormData(prev => ({ ...prev, camas: newCamas }));
  }

  const addCama = () => {
      setFormData(prev => ({ ...prev, camas: [...prev.camas, { tipo: TipoCama.SOLTEIRO, quantidade: 1 }] }));
  }

  const removeCama = (index: number) => {
      setFormData(prev => ({ ...prev, camas: prev.camas.filter((_, i) => i !== index) }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
        ...formData,
        capacidade: Number(formData.capacidade),
        precoDiaria: Number(formData.precoDiaria)
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800">
            {initialData ? 'Editar Quarto' : 'Novo Quarto'}
          </h3>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
             <span className="sr-only">Fechar</span>
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-label">Número do Quarto</label>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                className="form-control"
                placeholder="Ex: 104"
                required
                autoFocus
              />
            </div>
            
            <div>
              <label className="form-label">Tipo de Acomodação</label>
              <div className="relative">
                <select name="tipo" value={formData.tipo} onChange={handleChange} className="form-control appearance-none bg-white">
                  {Object.values(TipoQuarto).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="form-label">Capacidade</label>
              <div className="flex items-center">
                 <input
                    type="number"
                    name="capacidade"
                    value={formData.capacidade}
                    onChange={handleChange}
                    className="form-control"
                    min="1"
                 />
                 <span className="ml-2 text-sm text-slate-500">pessoas</span>
              </div>
            </div>
            
            <div>
              <label className="form-label">Diária (R$)</label>
              <input
                type="number"
                name="precoDiaria"
                value={formData.precoDiaria}
                onChange={handleChange}
                className="form-control font-medium"
                step="0.01"
              />
            </div>
          </div>

          <div className="pt-2">
              <div className="flex justify-between items-end mb-3">
                  <div>
                    <label className="form-label mb-1">Camas</label>
                    <p className="text-xs text-slate-500">Configure a disposição das camas</p>
                  </div>
                  <button type="button" onClick={addCama} className="text-sm text-blue-600 font-medium hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors">+ Adicionar Outra</button>
              </div>
              
              <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {formData.camas.map((cama, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                          <div className="flex-1 relative">
                              <select 
                                value={cama.tipo}
                                onChange={(e) => handleCamaChange(idx, 'tipo', e.target.value)}
                                className="form-control text-sm py-1.5"
                              >
                                  {Object.values(TipoCama).map(t => <option key={t} value={t}>{t}</option>)}
                              </select>
                          </div>
                          <div className="w-20">
                              <input 
                                type="number" 
                                value={cama.quantidade}
                                onChange={(e) => handleCamaChange(idx, 'quantidade', Number(e.target.value))}
                                className="form-control text-sm py-1.5 text-center"
                                min="1"
                              />
                          </div>
                          <button type="button" onClick={() => removeCama(idx)} className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded transition-colors" title="Remover cama">
                            <span className="sr-only">Remover</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                          </button>
                      </div>
                  ))}
              </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <button type="button" onClick={onCancel} className="btn bg-white border border-slate-300 text-slate-700 hover:bg-slate-50">
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary px-6 shadow-lg shadow-blue-500/20">
              {initialData ? 'Salvar Alterações' : 'Criar Quarto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
