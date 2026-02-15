import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    api.get('/quartos')
      .then((response) => {
        setQuartos(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar quartos:', error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">Hotel Reservation System</h1>
      </header>
      <main className="flex flex-col items-center mt-8">
        <p className="text-gray-700 text-lg mb-4">Bem-vindo ao sistema de reservas do hotel!</p>
        <h2 className="text-xl font-semibold mb-4">Lista de Quartos</h2>
        <ul className="w-3/4 bg-white shadow-md rounded-lg p-4">
          {quartos.map((quarto) => (
            <li
              key={quarto.numero}
              className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
              <span>Quarto {quarto.numero} - Tipo: {quarto.tipo}</span>
              <span className="font-semibold">R${quarto.precoPorDiaria}</span>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;