import { useState } from 'react';
import { Cabecalho } from './components/Cabecalho';
import { Navegacao } from './components/Navegacao';
import { Home } from './components/Home';
import { Recebimentos } from './components/Recebimentos';
import { PaginaEmConstrucao } from './components/PaginaEmConstrucao';

export default function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'home':
        return <Home />;
      case 'recebimentos':
        return <Recebimentos />;
      case 'pacientes':
        return (
          <PaginaEmConstrucao
            titulo="Pacientes"
            descricao="Gestão completa de pacientes e histórico de atendimentos"
          />
        );
      case 'agenda':
        return (
          <PaginaEmConstrucao
            titulo="Agenda"
            descricao="Calendário de agendamentos e controle de consultas"
          />
        );
      case 'relatorios':
        return (
          <PaginaEmConstrucao
            titulo="Relatórios"
            descricao="Relatórios gerenciais e análises detalhadas"
          />
        );
      case 'configuracoes':
        return (
          <PaginaEmConstrucao
            titulo="Configurações"
            descricao="Configurações do sistema e preferências"
          />
        );
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Cabecalho />
      <Navegacao paginaAtual={paginaAtual} setPagina={setPaginaAtual} />
      
      <main>
        {renderizarPagina()}
      </main>
    </div>
  );
}
