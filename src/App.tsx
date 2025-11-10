import { useState } from 'react';
import { Cabecalho } from './src/components/layout/Cabecalho';
import { Navegacao } from './src/components/layout/Navegacao';
import { Dashboard } from './src/pages/Dashboard';
import { Recebimentos } from './src/pages/Recebimentos';
import { FiltrosProvider } from './src/contexts/FiltrosContext';

export default function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('dashboard');

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'dashboard':
        return <Dashboard />;
      case 'recebimentos':
        return <Recebimentos />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <FiltrosProvider>
      <div className="min-h-screen bg-gray-50">
        <Cabecalho />
        <Navegacao paginaAtiva={paginaAtiva} setPaginaAtiva={setPaginaAtiva} />
        <main>{renderizarPagina()}</main>
      </div>
    </FiltrosProvider>
  );
}
