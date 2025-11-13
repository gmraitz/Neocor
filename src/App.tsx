import { useState } from 'react';
import { Cabecalho } from './src/components/layout/Cabecalho';
import { Sidebar } from './src/components/layout/Sidebar';
import { Dashboard } from './src/pages/Dashboard';
import { Upload } from './src/pages/Upload';
import { Recebimentos } from './src/pages/Recebimentos';
import { Relatorios } from './src/pages/Relatorios';
import { Login } from './src/pages/Login';
import { Cadastro } from './src/pages/Cadastro';
import { RecuperarSenhaEmail } from './src/pages/RecuperarSenhaEmail';
import { RecuperarSenhaCodigo } from './src/pages/RecuperarSenhaCodigo';
import { RecuperarSenhaNova } from './src/pages/RecuperarSenhaNova';
import { FiltrosProvider } from './src/contexts/FiltrosContext';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import './styles/globals.css';

function AppContent() {
  const [paginaAtiva, setPaginaAtiva] = useState('dashboard');
  const [modoRecuperacao, setModoRecuperacao] = useState(false);
  const { usuario, carregando } = useAuth();

  const renderizarPagina = () => {
    switch (paginaAtiva) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <Upload />;
      case 'recebimentos':
        return <Recebimentos />;
      case 'relatorios':
        return <Relatorios />;
      default:
        return <Dashboard />;
    }
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!usuario) {
    if (modoRecuperacao) {
      return <RecuperarSenhaEmail onVoltar={() => setModoRecuperacao(false)} />;
    }
    return <Login onRecuperarSenha={() => setModoRecuperacao(true)} />;
  }

  return (
    <FiltrosProvider>
      <div className="min-h-screen bg-gray-50">
        <Cabecalho onNavigate={setPaginaAtiva} />
        <div className="flex">
          <Sidebar paginaAtiva={paginaAtiva} setPaginaAtiva={setPaginaAtiva} />
          <main className="flex-1">{renderizarPagina()}</main>
        </div>
      </div>
      <Toaster />
    </FiltrosProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}