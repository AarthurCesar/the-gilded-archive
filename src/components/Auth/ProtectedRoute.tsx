import { useState, useEffect } from 'react';

const ADMIN_PIN = '2026'; // Altere para a senha desejada
const SESSION_KEY = 'restaurante:admin_auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  if (authenticated) return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#120E0A] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-[#1E1610] rounded-2xl border border-primary/10 p-8 max-w-xs w-full text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-primary text-3xl">lock</span>
        </div>
        <h1 className="font-serif text-on-surface font-bold text-xl mb-1">Area Restrita</h1>
        <p className="text-champagne text-sm mb-6">Digite a senha para acessar</p>

        <input
          type="password"
          inputMode="numeric"
          maxLength={8}
          value={pin}
          onChange={(e) => { setPin(e.target.value); setError(false); }}
          placeholder="Senha"
          autoFocus
          className={`w-full bg-surface-container-lowest rounded-xl p-4 text-center text-on-surface
                     font-serif text-2xl font-bold tracking-[0.5em] outline-none
                     border-b-2 transition-colors
                     ${error ? 'border-red-500' : 'border-transparent focus:border-primary'}`}
        />

        {error && (
          <p className="text-red-400 text-sm mt-2">Senha incorreta</p>
        )}

        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-full gold-gradient text-on-primary font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">login</span>
          Entrar
        </button>
      </form>
    </div>
  );
}
