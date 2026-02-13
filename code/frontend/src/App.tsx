import React, { useState } from 'react';
import { Plus, Hotel, AlertCircle } from 'lucide-react';
import { RoomForm } from './components/RoomForm';
import { RoomTable } from './components/RoomTable';
import { useQuartos } from './hooks/useQuartos';

const App: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { quartos, loading, error, cadastrarQuarto } = useQuartos();

  const handleCreateRoom = async (data: any) => {
    try {
      await cadastrarQuarto(data);
      setShowForm(false);
    } catch (e) {
      // Erro já tratado no hook
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header Component */}
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <Hotel size={28} />
          <h1 className="text-xl font-bold tracking-tight">Hotel Management System</h1>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Novo Quarto
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {showForm && (
          <RoomForm 
            onSubmit={handleCreateRoom}
            onSuccess={() => {}} 
            onCancel={() => setShowForm(false)} 
          />
        )}

        <RoomTable quartos={quartos} loading={loading} />
      </main>
    </div>
  );
};

export default App;
