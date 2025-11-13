import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, DadosCadastro, DadosLogin } from '../types/auth';

interface AuthContextData {
  usuario: Usuario | null;
  carregando: boolean;
  login: (dados: DadosLogin) => Promise<void>;
  cadastrar: (dados: DadosCadastro) => Promise<void>;
  logout: () => void;
  atualizarUsuario: (dados: Partial<Usuario>) => void;
  recuperarSenha: (email: string) => Promise<void>;
  validarCodigoRecuperacao: (email: string, codigo: string) => Promise<void>;
  redefinirSenha: (email: string, codigo: string, novaSenha: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('@neocor:usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
    setCarregando(false);
  }, []);

  const login = async (dados: DadosLogin) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Buscar usuários cadastrados
    const usuariosCadastrados = JSON.parse(
      localStorage.getItem('@neocor:usuarios') || '[]'
    );

    // Verificar credenciais
    const usuarioEncontrado = usuariosCadastrados.find(
      (u: Usuario & { senha: string }) =>
        u.email === dados.email && u.senha === dados.senha
    );

    if (!usuarioEncontrado) {
      throw new Error('Email ou senha incorretos');
    }

    // Remover senha antes de salvar no estado
    const { senha, ...usuarioSemSenha } = usuarioEncontrado;
    
    setUsuario(usuarioSemSenha);
    localStorage.setItem('@neocor:usuario', JSON.stringify(usuarioSemSenha));
  };

  const cadastrar = async (dados: DadosCadastro) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Buscar usuários cadastrados
    const usuariosCadastrados = JSON.parse(
      localStorage.getItem('@neocor:usuarios') || '[]'
    );

    // Verificar se email já existe
    const emailExiste = usuariosCadastrados.some(
      (u: Usuario & { senha: string }) => u.email === dados.email
    );

    if (emailExiste) {
      throw new Error('Este email já está cadastrado');
    }

    // Criar novo usuário
    const novoUsuario = {
      id: Math.random().toString(36).substr(2, 9),
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      cargo: dados.cargo,
      senha: dados.senha,
    };

    // Salvar novo usuário
    const novosUsuarios = [...usuariosCadastrados, novoUsuario];
    localStorage.setItem('@neocor:usuarios', JSON.stringify(novosUsuarios));

    // Fazer login automático
    const { senha, ...usuarioSemSenha } = novoUsuario;
    setUsuario(usuarioSemSenha);
    localStorage.setItem('@neocor:usuario', JSON.stringify(usuarioSemSenha));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('@neocor:usuario');
  };

  const atualizarUsuario = (dados: Partial<Usuario>) => {
    if (!usuario) return;

    const usuarioAtualizado = { ...usuario, ...dados };
    setUsuario(usuarioAtualizado);
    localStorage.setItem('@neocor:usuario', JSON.stringify(usuarioAtualizado));

    // Atualizar também na lista de usuários
    const usuariosCadastrados = JSON.parse(
      localStorage.getItem('@neocor:usuarios') || '[]'
    );

    const usuariosAtualizados = usuariosCadastrados.map(
      (u: Usuario & { senha: string }) => {
        if (u.id === usuario.id) {
          return { ...u, ...dados };
        }
        return u;
      }
    );

    localStorage.setItem('@neocor:usuarios', JSON.stringify(usuariosAtualizados));
  };

  const recuperarSenha = async (email: string) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Verificar se email existe
    const usuariosCadastrados = JSON.parse(
      localStorage.getItem('@neocor:usuarios') || '[]'
    );

    const usuarioEncontrado = usuariosCadastrados.find(
      (u: Usuario & { senha: string }) => u.email === email
    );

    if (!usuarioEncontrado) {
      throw new Error('Email não encontrado');
    }

    // Gerar código de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    // Salvar código temporariamente (em produção, seria enviado por email)
    const codigosRecuperacao = JSON.parse(
      localStorage.getItem('@neocor:codigos-recuperacao') || '{}'
    );

    codigosRecuperacao[email] = {
      codigo,
      expira: Date.now() + 15 * 60 * 1000, // 15 minutos
    };

    localStorage.setItem(
      '@neocor:codigos-recuperacao',
      JSON.stringify(codigosRecuperacao)
    );

    // Em produção, aqui seria enviado por email
    // Por enquanto, vamos logar no console
    console.log(`Código de recuperação para ${email}: ${codigo}`);
  };

  const validarCodigoRecuperacao = async (email: string, codigo: string) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const codigosRecuperacao = JSON.parse(
      localStorage.getItem('@neocor:codigos-recuperacao') || '{}'
    );

    const codigoSalvo = codigosRecuperacao[email];

    if (!codigoSalvo) {
      throw new Error('Código não encontrado. Solicite um novo código.');
    }

    if (Date.now() > codigoSalvo.expira) {
      throw new Error('Código expirado. Solicite um novo código.');
    }

    if (codigoSalvo.codigo !== codigo) {
      throw new Error('Código inválido');
    }
  };

  const redefinirSenha = async (
    email: string,
    codigo: string,
    novaSenha: string
  ) => {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Validar código novamente
    await validarCodigoRecuperacao(email, codigo);

    // Atualizar senha
    const usuariosCadastrados = JSON.parse(
      localStorage.getItem('@neocor:usuarios') || '[]'
    );

    const usuariosAtualizados = usuariosCadastrados.map(
      (u: Usuario & { senha: string }) => {
        if (u.email === email) {
          return { ...u, senha: novaSenha };
        }
        return u;
      }
    );

    localStorage.setItem('@neocor:usuarios', JSON.stringify(usuariosAtualizados));

    // Remover código usado
    const codigosRecuperacao = JSON.parse(
      localStorage.getItem('@neocor:codigos-recuperacao') || '{}'
    );
    delete codigosRecuperacao[email];
    localStorage.setItem(
      '@neocor:codigos-recuperacao',
      JSON.stringify(codigosRecuperacao)
    );
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        carregando,
        login,
        cadastrar,
        logout,
        atualizarUsuario,
        recuperarSenha,
        validarCodigoRecuperacao,
        redefinirSenha,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}