import { Construction } from 'lucide-react';
import { Cartao, CartaoConteudo } from './ui/cartao';

interface PaginaEmConstrucaoProps {
  titulo: string;
  descricao: string;
}

export function PaginaEmConstrucao({ titulo, descricao }: PaginaEmConstrucaoProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">{titulo}</h1>
        <p className="text-gray-600">{descricao}</p>
      </div>

      <Cartao>
        <CartaoConteudo className="py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-blue-100 p-6 rounded-full mb-6">
              <Construction className="h-16 w-16 text-blue-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Módulo em Desenvolvimento</h2>
            <p className="text-gray-600 max-w-md">
              Esta funcionalidade está em construção e estará disponível em breve.
            </p>
          </div>
        </CartaoConteudo>
      </Cartao>
    </div>
  );
}
