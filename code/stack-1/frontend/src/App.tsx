import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { QuartosPage } from './pages/QuartosPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div className="text-center py-20 text-slate-500">Dashboard em desenvolvimento...</div>} />
          <Route path="/quartos" element={<QuartosPage />} />
          <Route path="/hospedes" element={<div className="text-center py-20 text-slate-500">Módulo de Hóspedes em breve.</div>} />
          <Route path="/reservas" element={<div className="text-center py-20 text-slate-500">Módulo de Reservas em breve.</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
