import {
  Building2,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import logoConsolida from "figma:asset/a04eaeee1e3dc320851449302952eeb6080c0b9d.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  Avatar,
  AvatarReserva,
} from "../../../components/ui/avatar";

interface CabecalhoProps {
  onNavigate?: (pagina: string) => void;
}

export function Cabecalho({ onNavigate }: CabecalhoProps) {
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getInitials = (nome: string) => {
    const parts = nome.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  return (
    <header className="border-b bg-white">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={logoConsolida}
              alt="Logo Consolida"
              className="h-20"
              style={{ width: "auto" }}
            />
          </div>

          {usuario && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    {usuario.nome}
                  </p>
                  {usuario.cargo && (
                    <p className="text-xs text-gray-500">
                      {usuario.cargo}
                    </p>
                  )}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarReserva className="bg-blue-600 text-white">
                    {getInitials(usuario.nome)}
                  </AvatarReserva>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  Minha Conta
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onNavigate?.("configuracoes")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
}