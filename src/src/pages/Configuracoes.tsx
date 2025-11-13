import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function Configuracoes() {
  const { usuario, atualizarUsuario } = useAuth();
  const [formData, setFormData] = useState({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    telefone: usuario?.telefone || '',
    cargo: usuario?.cargo || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email) {
      toast.error('Nome e email são obrigatórios');
      return;
    }

    atualizarUsuario(formData);
    toast.success('Informações atualizadas com sucesso!');
  };

  const handleChange = (campo: string, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <h2 className="mb-2">Configurações</h2>
        <p className="text-gray-600">Gerencie suas informações pessoais</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Usuário</CardTitle>
          <CardDescription>
            Atualize seus dados pessoais e informações de contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <Label htmlFor="nome">Nome Completo *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Telefone */}
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="telefone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="pl-10"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                  />
                </div>
              </div>

              {/* Cargo */}
              <div>
                <Label htmlFor="cargo">Cargo</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="cargo"
                    type="text"
                    placeholder="Seu cargo"
                    className="pl-10"
                    value={formData.cargo}
                    onChange={(e) => handleChange('cargo', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Informações da conta */}
            <div className="pt-6 border-t">
              <h3 className="text-gray-900 mb-4">Informações da Conta</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ID do Usuário:</span>
                  <span className="text-gray-900">{usuario?.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600">Ativo</span>
                </div>
              </div>
            </div>

            {/* Botão de Salvar */}
            <div className="flex justify-end pt-6 border-t">
              <Button type="submit" className="gap-2">
                <Save className="h-4 w-4" />
                Salvar Alterações
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}