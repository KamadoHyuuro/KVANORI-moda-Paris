import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#181716] text-[#FAF8F5] relative overflow-hidden">
      {/* Subtle border detailing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#BDB2A2] block font-sans">
            Correspondance Parisienne
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-[#FAF8F5]">
            La Gazette KVANORI
          </h2>
          <p className="text-sm sm:text-base text-[#D4C8B8] font-serif italic max-w-lg mx-auto">
            Receba nossos ensaios literários, prévias das novas cápsulas de alfaiataria e crônicas do 6º arrondissement de Paris.
          </p>
        </div>

        {subscribed ? (
          <div className="p-6 bg-[#252422] border border-[#3E3C38] max-w-md mx-auto space-y-2 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2 text-[#88B085]">
              <Check className="w-5 h-5" />
              <span className="font-serif text-lg text-white">Merci beaucoup!</span>
            </div>
            <p className="text-xs text-[#C5BBAE]">
              Sua assinatura foi registrada no ateliê. Use o código <strong className="text-white">PARIS1986</strong> na sua primeira compra para 10% de privilégio.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Seu endereço de e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#242220] border border-[#44403B] text-white text-xs placeholder-[#8F887D] focus:outline-hidden focus:border-[#FAF8F5] font-sans"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#FAF8F5] text-[#181716] hover:bg-[#EBE5DB] text-xs uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>Inscrever-se</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#8C8477]">
          Respeitamos sua privacidade. Nenhuma mensagem supérflua, apenas elegância e correspondência editorial.
        </p>

      </div>
    </section>
  );
};
