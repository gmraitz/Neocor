import { CartoesResumo } from './CartoesResumo';
import { Graficos } from './Graficos';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">Dashboard Financeiro</h1>
        <p className="text-gray-600">Visão geral dos recebimentos e análise financeira</p>
      </div>

      <CartoesResumo />

      <div className="mt-8">
        <Graficos />
      </div>
    </div>
  );
}
