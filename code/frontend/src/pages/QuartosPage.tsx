import React, { useEffect, useState } from 'react';
import { QuartoList } from '../components/QuartoList';
import { QuartoForm } from '../components/QuartoForm';
import { QuartoService } from '../services/api';
import type { Quarto } from '../types';
import { Plus } from 'lucide-react';

export const QuartosPage: React.FC = () => {
  const [quartos, setQuartos] = useState<Quarto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuarto, setEditingQuarto] = useState<Quarto | undefined>(undefined);

  useEffect(() => {
    loadQuartos();
  }, []);

  const loadQuartos = async () => {
    setIsLoading(true);
    try {
      const data = await QuartoService.getAll();
      setQuartos(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingQuarto(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (quarto: Quarto) => {
    setEditingQuarto(quarto);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
      if (confirm('Tem certeza que deseja excluir este quarto?')) {
          await QuartoService.delete(id);
          loadQuartos();
      }
  }

  const handleSubmit = async (data: any) => {
    if (editingQuarto) {
      await QuartoService.update(editingQuarto.id, data);
    } else {
      await QuartoService.create(data);
    }
    setIsModalOpen(false);
    loadQuartos();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestão de Quartos</h1>
          <p className="text-slate-500">Gerencie os quartos, tipos e disponibilidade.</p>
        </div>
        <button onClick={handleCreate} className="btn btn-primary">
          <Plus size={20} /> Novo Quarto
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : (
        <QuartoList 
            quartos={quartos} 
            onEdit={handleEdit} 
            onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
        <QuartoForm
          initialData={editingQuarto}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
