import React, { useState, useEffect } from 'react';
import { TipoQuarto, TipoCama } from './domain-entities';
import { Plus, Edit2, Hotel } from 'lucide-react';

// Estilos rápidos simulando a paleta verde/azul
const styles = {
  header: "bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg",
  card: "bg-white p-6 rounded-xl shadow-md border border-gray-100",
  buttonPrimary: "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2",
  buttonSecondary: "bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2",
  input: "w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none",
  badge: (status: string) => {
    const colors: any = {
      'Livre': 'bg-green-100 text-green-700',
      'Ocupado': 'bg-red-100 text-red-700',
      'Manutenção': 'bg-yellow-100 text-yellow-700',
      'Limpeza': 'bg-blue-100 text-blue-700'
    };
    return `px-3 py-1 rounded-full text-xs font-bold ${colors[status] || 'bg-gray-100 text-gray-700'}`;
  }
};

const App: React.FC = () => {
  const [quartos, setQuartos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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

  const fetchQuartos = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/quartos');
      const data = await res.json();
      setQuartos(data);
    } catch (e) {
      console.error("Erro ao buscar quartos", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuartos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:3001/api/quartos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowForm(false);
      fetchQuartos();
    } catch (e) {
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header */}
      <header className={styles.header}>
        <div className="flex items-center gap-2">
          <Hotel size={28} />
          <h1 className="text-xl font-bold tracking-tight">Hotel Management System</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className={styles.buttonSecondary}>
          <Plus size={20} /> Novo Quarto
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {showForm && (
          <div className={`${styles.card} mb-8 animate-in slide-in-from-top duration-300`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-700">
              <Plus size={20} /> Cadastrar Novo Quarto
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                placeholder="Número do Quarto" 
                className={styles.input} 
                onChange={e => setFormData({...formData, numero: e.target.value})}
                required
              />
              <input 
                type="number" 
                placeholder="Capacidade" 
                className={styles.input}
                onChange={e => setFormData({...formData, capacidade: Number(e.target.value)})}
              />
              <select 
                className={styles.input}
                onChange={e => setFormData({...formData, tipo: e.target.value as TipoQuarto})}
              >
                {Object.values(TipoQuarto).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input 
                type="number" 
                placeholder="Preço Diária" 
                className={styles.input}
                onChange={e => setFormData({...formData, precoDiaria: Number(e.target.value)})}
              />
              
              <div className="md:col-span-3 flex flex-wrap gap-4 bg-blue-50 p-4 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={e => setFormData({...formData, temFrigobar: e.target.checked})} /> Frigobar
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={e => setFormData({...formData, temCafeIncluso: e.target.checked})} /> Café incluso
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={e => setFormData({...formData, temArCondicionado: e.target.checked})} /> Ar-condicionado
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" onChange={e => setFormData({...formData, temTV: e.target.checked})} /> TV
                </label>
              </div>

              <div className="md:col-span-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 px-4">Cancelar</button>
                <button type="submit" className={styles.buttonPrimary}>Salvar Quarto</button>
              </div>
            </form>
          </div>
        )}

        {/* Listagem */}
        <div className={styles.card}>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-green-700">
            <Hotel size={20} /> Lista de Quartos
          </h2>
          
          {loading ? <p>Carregando...</p> : (
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
                        <span className={styles.badge(q.disponibilidade)}>
                          {q.disponibilidade}
                        </span>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
