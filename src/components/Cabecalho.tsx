import { Building2, Bell, User } from 'lucide-react';
import { Botao } from './ui/botao';
import { Avatar, AvatarReserva } from './ui/avatar';

export function Cabecalho() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-gray-900">NEOCOR</div>
              <p className="text-sm text-gray-500">Sistema de Recebimentos</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Botao variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Botao>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-gray-900">Dr. João Silva</div>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
              <Avatar>
                <AvatarReserva className="bg-blue-100 text-blue-600">
                  <User className="h-5 w-5" />
                </AvatarReserva>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
