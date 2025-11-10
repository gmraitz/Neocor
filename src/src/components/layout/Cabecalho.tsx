import { Building2 } from 'lucide-react';

export function Cabecalho() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-blue-600">NEOCOR</h1>
            <p className="text-sm text-gray-600">Sistema de Gestão Financeira</p>
          </div>
        </div>
      </div>
    </header>
  );
}
