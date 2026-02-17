import React from 'react';

// Componente para o cabeçalho
// Decisão: Criamos um componente separado para o cabeçalho para seguir o princípio de responsabilidade única (SRP) e facilitar a reutilização.
const Header = () => (
    <header className="bg-blue-600 text-white w-full py-4 shadow-md">
        <h1 className="text-center text-2xl font-bold">Hotel Reservation System</h1>
    </header>
);

// Componente para a lista de quartos
// Decisão: A lista de quartos foi isolada em um componente para melhorar a modularidade e permitir testes independentes.
const RoomList = ({ quartos }) => (
    <ul className="w-3/4 bg-white shadow-md rounded-lg p-4">
        {quartos.map((quarto) => (
            <li
                key={quarto.numero}
                className="flex justify-between items-center border-b last:border-b-0 py-2"
            >
            {/* Decisão: Usamos "key" para garantir que cada item da lista seja único, evitando problemas de renderização no React. */}
            <span>Quarto {quarto.numero} - Tipo: {quarto.tipo}</span>
            <span className="font-semibold">R${quarto.precoPorDiaria}</span>
        </li>
    ))}
    </ul>
);

// Componente principal
// Decisão: O componente principal é responsável por gerenciar o estado e passar os dados necessários para os componentes filhos.
function App() {
    // Decisão: Os dados dos quartos foram definidos como um array estático para simplificar o exemplo. Em um cenário real, esses dados poderiam vir de uma API.
    const quartos = [
        { numero: 101, tipo: 'Solteiro', precoPorDiaria: 100 },
        { numero: 102, tipo: 'Casal', precoPorDiaria: 150 },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            {/* Decisão: O cabeçalho foi incluído aqui para manter a estrutura da página consistente. */}
            <Header />
            <main className="flex flex-col items-center mt-8">
                {/* Decisão: Mensagem de boas-vindas para melhorar a experiência do usuário. */}
                <p className="text-gray-700 text-lg mb-4">Bem-vindo ao sistema de reservas do hotel!</p>
                <h2 className="text-xl font-semibold mb-4">Lista de Quartos</h2>
                {/* Decisão: Passamos os dados dos quartos como props para o componente RoomList para manter a separação de responsabilidades. */}
                <RoomList quartos={quartos} />
      </main>
    </div>
  );
}

export default App;