import { useState } from 'react';
import { Building2, Mail, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

interface RecuperarSenhaProps {
  onVoltar: () => void;
}

export function RecuperarSenha({ onVoltar }: RecuperarSenhaProps) {
  const [etapa, setEtapa] = useState<'email' | 'codigo' | 'novaSenha'>('email');
  const [carregando, setCarregando] = useState(false);
  const { recuperarSenha, validarCodigoRecuperacao, redefinirSenha } = useAuth();

  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const handleEnviarEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error('Por favor, informe seu email');
      return;
    }

    setCarregando(true);
    try {
      await recuperarSenha(email);
      toast.success('Código de recuperação enviado para seu email!');
      setEtapa('codigo');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao enviar código');
    } finally {
      setCarregando(false);
    }
  };

  const handleValidarCodigo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigo) {
      toast.error('Por favor, informe o código');
      return;
    }

    if (codigo.length !== 6) {
      toast.error('O código deve ter 6 dígitos');
      return;
    }

    setCarregando(true);
    try {
      await validarCodigoRecuperacao(email, codigo);
      toast.success('Código validado com sucesso!');
      setEtapa('novaSenha');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Código inválido');
    } finally {
      setCarregando(false);
    }
  };

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!novaSenha || !confirmarNovaSenha) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    if (novaSenha !== confirmarNovaSenha) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (novaSenha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setCarregando(true);
    try {
      await redefinirSenha(email, codigo, novaSenha);
      toast.success('Senha redefinida com sucesso!');
      setTimeout(() => {
        onVoltar();
      }, 1500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erro ao redefinir senha');
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
            <p className="text-sm text-gray-600">Recuperação de Senha</p>
          </div>

          {/* Etapa 1: Email */}
          {etapa === 'email' && (
            <form onSubmit={handleEnviarEmail} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Informe seu email cadastrado para receber um código de recuperação
                </p>
              </div>

              <div>
                <Label htmlFor="email-recuperacao">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="email-recuperacao"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={carregando}>
                {carregando ? 'Enviando...' : 'Enviar Código'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={onVoltar}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Login
              </Button>
            </form>
          )}

          {/* Etapa 2: Código */}
          {etapa === 'codigo' && (
            <form onSubmit={handleValidarCodigo} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Digite o código de 6 dígitos enviado para
                </p>
                <p className="text-sm text-gray-900">{email}</p>
              </div>

              <div>
                <Label htmlFor="codigo-recuperacao">Código de Recuperação</Label>
                <div className="relative mt-1">
                  <Input
                    id="codigo-recuperacao"
                    type="text"
                    placeholder="000000"
                    className="text-center tracking-widest"
                    maxLength={6}
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Verifique sua caixa de entrada e spam
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={carregando}>
                {carregando ? 'Validando...' : 'Validar Código'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setEtapa('email')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </form>
          )}

          {/* Etapa 3: Nova Senha */}
          {etapa === 'novaSenha' && (
            <form onSubmit={handleRedefinirSenha} className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  Defina sua nova senha de acesso
                </p>
              </div>

              <div>
                <Label htmlFor="nova-senha">Nova Senha</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="nova-senha"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    className="pl-10"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="confirmar-nova-senha">Confirmar Nova Senha</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="confirmar-nova-senha"
                    type="password"
                    placeholder="Confirme sua senha"
                    className="pl-10"
                    value={confirmarNovaSenha}
                    onChange={(e) => setConfirmarNovaSenha(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={carregando}>
                {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
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
