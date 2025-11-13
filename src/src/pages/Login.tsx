import { useState } from 'react';
import { Building2, Mail, Lock, User, Phone, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface LoginProps {
  onRecuperarSenha?: () => void;
}

export function Login({ onRecuperarSenha }: LoginProps) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const { login, cadastrar } = useAuth();

  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: '',
  });

  const [formCadastro, setFormCadastro] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cargo: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formLogin.email || !formLogin.senha) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    setCarregando(true);
    try {
      await login(formLogin);
      toast.success('Login realizado com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (formCadastro.senha !== formCadastro.confirmarSenha) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (formCadastro.senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setCarregando(true);
    try {
      await cadastrar({
        nome: formCadastro.nome,
        email: formCadastro.email,
        senha: formCadastro.senha,
        telefone: formCadastro.telefone,
        cargo: formCadastro.cargo,
      });
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer cadastro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Logo e Título */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-lg mb-4">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-blue-600 mb-2">CONSOLIDA</h1>
            <p className="text-sm text-gray-600">Sistema de Gestão Financeira</p>
          </div>

          {/* Toggle Login/Cadastro */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setModoCadastro(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                !modoCadastro
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setModoCadastro(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                modoCadastro
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário de Login */}
          {!modoCadastro && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email-login">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formLogin.email}
                    onChange={(e) =>
                      setFormLogin({ ...formLogin, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="senha-login">Senha</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="senha-login"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formLogin.senha}
                    onChange={(e) =>
                      setFormLogin({ ...formLogin, senha: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={carregando}>
                {carregando ? 'Entrando...' : 'Entrar'}
              </Button>

              {onRecuperarSenha && (
                <button
                  type="button"
                  onClick={onRecuperarSenha}
                  className="w-full text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Esqueci minha senha
                </button>
              )}
            </form>
          )}

          {/* Formulário de Cadastro */}
          {modoCadastro && (
            <form onSubmit={handleCadastro} className="space-y-4">
              <div>
                <Label htmlFor="nome-cadastro">Nome Completo *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="nome-cadastro"
                    type="text"
                    placeholder="Seu nome completo"
                    className="pl-10"
                    value={formCadastro.nome}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, nome: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email-cadastro">Email *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email-cadastro"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={formCadastro.email}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="telefone-cadastro">Telefone</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="telefone-cadastro"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    className="pl-10"
                    value={formCadastro.telefone}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, telefone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="cargo-cadastro">Cargo</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="cargo-cadastro"
                    type="text"
                    placeholder="Seu cargo"
                    className="pl-10"
                    value={formCadastro.cargo}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, cargo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="senha-cadastro">Senha *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="senha-cadastro"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10"
                    value={formCadastro.senha}
                    onChange={(e) =>
                      setFormCadastro({ ...formCadastro, senha: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmar-senha">Confirmar Senha *</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmar-senha"
                    type="password"
                    placeholder="Confirme sua senha"
                    className="pl-10"
                    value={formCadastro.confirmarSenha}
                    onChange={(e) =>
                      setFormCadastro({
                        ...formCadastro,
                        confirmarSenha: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={carregando}>
                {carregando ? 'Cadastrando...' : 'Criar Conta'}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          © 2024 CONSOLIDA - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}