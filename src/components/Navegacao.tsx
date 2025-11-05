import { Home, Receipt, Calendar, FileText, Settings } from 'lucide-react';

interface NavegacaoProps {
  paginaAtual: string;
  setPagina: (pagina: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Dashboard', icon: Home },
  { id: 'recebimentos', label: 'Recebimentos', icon: Receipt },
  { id: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'relatorios', label: 'Relatórios', icon: FileText },
  { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

export function Navegacao({ paginaAtual, setPagina }: NavegacaoProps) {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1 overflow-x-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = paginaAtual === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setPagina(item.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
