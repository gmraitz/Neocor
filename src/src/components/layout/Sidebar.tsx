import { useState, useEffect } from 'react';
import { LayoutDashboard, DollarSign, FileText, ChevronLeft, ChevronRight, Building2, Upload } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

interface SidebarProps {
  paginaAtiva: string;
  setPaginaAtiva: (pagina: string) => void;
}

export function Sidebar({ paginaAtiva, setPaginaAtiva }: SidebarProps) {
  const [expandido, setExpandido] = useState(() => {
    const saved = localStorage.getItem('sidebar-expandido');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expandido', String(expandido));
  }, [expandido]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recebimentos', label: 'Recebimentos', icon: DollarSign },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'relatorios', label: 'Relatórios', icon: FileText },
  ];

  return (
    <aside
      className={cn(
        'bg-white border-r min-h-screen transition-all duration-300 flex flex-col flex-shrink-0',
        expandido ? 'w-64' : 'w-16'
      )}
    >
      {/* Entidade/Empresa e Toggle */}
      <div className="p-4 border-b flex items-center justify-between">
        {expandido ? (
          <>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-gray-600 flex-shrink-0" />
              <span className="text-sm text-gray-900">NEOCOR</span>
            </div>
            <button
              onClick={() => setExpandido(!expandido)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Recolher menu"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 w-full">
            <Building2 className="h-5 w-5 text-gray-600" />
            <button
              onClick={() => setExpandido(!expandido)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Expandir menu"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = paginaAtiva === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setPaginaAtiva(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-50',
                  !expandido && 'justify-center'
                )}
                title={!expandido ? item.label : ''}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {expandido && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}