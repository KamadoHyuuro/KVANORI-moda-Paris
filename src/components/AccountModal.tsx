import React, { useState } from 'react';
import { X, User, Lock, Mail, Shield, Check, AlertCircle, LogOut, ArrowRight, Package, Eye, EyeOff } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAuth } from '../context/AuthContext';
import { useStoreData } from '../context/StoreDataContext';

export const AccountModal: React.FC = () => {
  const { isAccountModalOpen, setIsAccountModalOpen, navigateTo } = useNavigation();
  const {
    user,
    role,
    isAdmin,
    error,
    authPromptMessage,
    setAuthPromptMessage,
    clearError,
    signIn,
    signUp,
    signOutUser,
    requestPasswordReset
  } = useAuth();

  const { orders } = useStoreData();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  // Form fields MUST ALWAYS start completely empty - NO defaults or autofills
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isAccountModalOpen) return null;

  const handleClose = () => {
    clearError();
    setActionSuccessMessage(null);
    setAuthPromptMessage(null);
    setIsAccountModalOpen(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccessMessage(null);
    clearError();
    setSubmitting(true);
    try {
      await signIn(email, password);
      setActionSuccessMessage('Acesso realizado com sucesso.');
      setTimeout(() => {
        setActionSuccessMessage(null);
        handleClose();
      }, 1200);
    } catch {
      // Error is set in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccessMessage(null);
    clearError();
    setSubmitting(true);
    try {
      await signUp(name, email, password);
      setActionSuccessMessage('Conta de cliente criada com sucesso.');
      setTimeout(() => {
        setActionSuccessMessage(null);
        handleClose();
      }, 1200);
    } catch {
      // Error is set in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      const msg = await requestPasswordReset(email);
      setActionSuccessMessage(msg);
    } catch {
      // Handled in context
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOutUser();
    setActionSuccessMessage('Sessão encerrada com sucesso.');
    setTimeout(() => {
      setActionSuccessMessage(null);
      handleClose();
      navigateTo('home');
    }, 1000);
  };

  const userOrders = user ? orders.filter(o => o.userId === user.id) : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] max-w-md w-full border border-[#E8E1D5] shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200 my-8">
        
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-[#181716] hover:text-[#6B1D2F] p-1.5 transition-colors cursor-pointer"
          aria-label="Fechar conta"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A746B]">Espace Client · Paris 1986</span>
            {user && (
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-xs ${
                isAdmin ? 'bg-[#6B1D2F] text-[#FAF8F5]' : 'bg-[#E3DCB8] text-[#3A3326]'
              }`}>
                {role === 'administrador' ? 'Administrador' : 'Cliente'}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-serif text-[#181716]">
            {user ? 'Minha Conta' : 'Identificação'}
          </h3>
          <p className="text-xs text-[#5D574F] font-serif italic">
            {user 
              ? 'Gerencie seus pedidos e informações da boutique.'
              : 'Entre ou cadastre-se para acompanhar sua sacola e compras.'}
          </p>
        </div>

        {/* Context Prompt: When triggered from Cart or Checkout */}
        {!user && authPromptMessage && (
          <div className="p-3.5 bg-[#F4EFE6] border border-[#D5CCC0] text-[#181716] text-xs flex items-center gap-2.5 shadow-xs">
            <Lock className="w-4 h-4 text-[#6B1D2F] shrink-0" />
            <span className="font-serif italic text-sm">{authPromptMessage}</span>
          </div>
        )}

        {/* Status & Alerts */}
        {actionSuccessMessage && (
          <div className="p-3 bg-[#E8F0E6] border border-[#C5D8C1] text-[#294B24] text-xs flex items-center gap-2 rounded-xs">
            <Check className="w-4 h-4 shrink-0 text-[#294B24]" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-[#FDF0EE] border border-[#F3C5BF] text-[#7E2419] text-xs flex items-center gap-2 rounded-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* LOGGED IN VIEW */}
        {user ? (
          <div className="space-y-5">
            {/* User Profile Card */}
            <div className="p-4 bg-white border border-[#E8E1D5] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#181716] text-[#FAF8F5] flex items-center justify-center font-serif text-xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-base text-[#181716] truncate">{user.name}</h4>
                  <p className="text-xs text-[#6D675E] truncate">{user.email}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#EFEBE4] flex items-center justify-between text-xs">
                <span className="text-[#787166]">Status do Usuário:</span>
                <span className="font-medium text-[#181716] uppercase tracking-wider text-[11px]">
                  {isAdmin ? 'Administrador Oficial' : 'Cliente'}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    handleClose();
                    navigateTo('admin');
                  }}
                  className="w-full py-2.5 px-4 bg-[#6B1D2F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#83263B] transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Administração
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => {
                  handleClose();
                  navigateTo('orders');
                }}
                className="w-full py-2.5 px-4 bg-white border border-[#D8CEBC] text-[#181716] text-xs uppercase tracking-wider font-medium hover:bg-[#F2EDE4] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#6B1D2F]" />
                  Meus Pedidos ({isAdmin ? 'Gestão Geral' : userOrders.length})
                </span>
                <ArrowRight className="w-4 h-4 text-[#7A746B]" />
              </button>
            </div>

            {/* Logout button */}
            <div className="pt-2 border-t border-[#E8E1D5] flex justify-between items-center">
              <button
                onClick={handleLogout}
                disabled={submitting}
                className="text-xs text-[#A63A2A] hover:underline flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sair da conta
              </button>
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#3D3A36] transition-colors cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        ) : (
          /* GUEST VIEW - NOT LOGGED IN */
          <div className="space-y-4">
            {/* Nav tabs: Entrar | Criar Conta */}
            <div className="flex border-b border-[#E8E1D5] text-xs uppercase tracking-wider">
              <button
                onClick={() => {
                  setMode('login');
                  clearError();
                }}
                className={`flex-1 py-2 text-center border-b-2 font-medium cursor-pointer transition-colors ${
                  mode === 'login' ? 'border-[#181716] text-[#181716]' : 'border-transparent text-[#7F796F]'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  clearError();
                }}
                className={`flex-1 py-2 text-center border-b-2 font-medium cursor-pointer transition-colors ${
                  mode === 'register' ? 'border-[#181716] text-[#181716]' : 'border-transparent text-[#7F796F]'
                }`}
              >
                Criar Conta
              </button>
            </div>

            {/* LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#47423B] font-medium mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu e-mail cadastrado"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[#47423B] font-medium">Senha</label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        clearError();
                      }}
                      className="text-[11px] text-[#6B1D2F] hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Sua senha"
                      className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#8A8377] hover:text-[#181716] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer mt-2"
                >
                  {submitting ? 'Acessando...' : 'Entrar na Boutique'}
                </button>
              </form>
            )}

            {/* REGISTER FORM */}
            {mode === 'register' && (
              <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[#47423B] font-medium mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#47423B] font-medium mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#47423B] font-medium mb-1">Senha</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Crie sua senha (mínimo 6 caracteres)"
                      className="w-full pl-9 pr-9 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-[#8A8377] hover:text-[#181716] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#6B1D2F] transition-colors cursor-pointer mt-2"
                >
                  {submitting ? 'Criando conta...' : 'Criar Conta de Cliente'}
                </button>
              </form>
            )}

            {/* FORGOT PASSWORD FORM */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-3.5 text-xs">
                <p className="text-xs text-[#5D574F]">
                  Digite seu e-mail cadastrado para receber instruções de recuperação de senha.
                </p>
                <div>
                  <label className="block text-[#47423B] font-medium mb-1">E-mail</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-[#8A8377]" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#D5CDBD] focus:border-[#181716] focus:outline-hidden text-xs text-[#181716]"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      clearError();
                    }}
                    className="flex-1 py-2.5 border border-[#D5CDBD] bg-white text-[#181716] text-xs uppercase tracking-wider font-medium hover:bg-[#F2EDE4] cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-2.5 bg-[#6B1D2F] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#83263B] transition-colors cursor-pointer"
                  >
                    {submitting ? 'Enviando...' : 'Recuperar Senha'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
