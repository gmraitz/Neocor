import { LayoutDashboard, DollarSign } from 'lucide-react';

interface NavegacaoProps {
  paginaAtiva: string;
  setPaginaAtiva: (pagina: string) => void;
}

export function Navegacao({ paginaAtiva, setPaginaAtiva }: NavegacaoProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recebimentos', label: 'Recebimentos', icon: DollarSign },
  ];

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = paginaAtiva === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setPaginaAtiva(item.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
