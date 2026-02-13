import React, { useState } from 'react';
import { Plus, Hotel, AlertCircle, Loader2 } from 'lucide-react';
import { RoomForm } from './components/RoomForm';
import { RoomTable } from './components/RoomTable';
import { useQuartos } from './hooks/useQuartos';

/**
 * Componente Principal da Aplicação.
 * Atua como o orquestrador de alto nível, compondo os componentes de UI
 * e vinculando-os à lógica de negócio através do hook customizado.
 */
const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const { quartos, loading, error, cadastrarQuarto } = useQuartos();

  /**
   * Encapsula a ação de criação de um novo quarto.
   */
  const handleCreateRoom = async (data: any) => {
    try {
      await cadastrarQuarto(data);
      setShowForm(false);
    } catch (e) {
      // O erro é capturado e gerenciado pelo hook useQuartos, 
      // que atualiza o estado de erro global exibido abaixo.
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
      {/* Barra de Navegação Superior */}
      <header className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Hotel size={28} className="text-blue-100" />
          <div>
            <h1 className="text-xl font-bold tracking-tight leading-none">Hotel AI4ES</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-1">Management System</p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2 font-medium"
          aria-label="Abrir formulário de novo quarto"
        >
          <Plus size={20} /> 
          <span className="hidden sm:inline">Novo Quarto</span>
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Banner de Erro Estruturado */}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-start gap-3 rounded shadow-sm animate-in fade-in slide-in-from-left-2">
            <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Atenção</p>
              <p className="text-sm opacity-90">{error}</p>
            </div>
          </div>
        )}

        {/* Componente de Formulário (Renderização Condicional) */}
        {showForm && (
          <section className="relative">
            <RoomForm 
              onSubmit={handleCreateRoom}
              onSuccess={() => {}} 
              onCancel={() => setShowForm(false)} 
            />
          </section> 
        )}

        {/* Área de Dados Principal */}
        <section className="min-h-[400px]">
          {loading && !quartos.length ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
              <Loader2 size={40} className="animate-spin text-blue-500" />
              <p className="animate-pulse">Sincronizando com o servidor...</p>
            </div>
          ) : (
            <RoomTable quartos={quartos} loading={loading} />
          )}
        </section>
      </main>

      {/* Rodapé Simples */}
      <footer className="py-8 text-center text-gray-400 text-xs">
        &copy; 2026 Hotel AI4ES - Sistema de Gestão de Reserva. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
