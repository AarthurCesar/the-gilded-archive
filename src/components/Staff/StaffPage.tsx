import { Link } from 'react-router-dom';
import { useOrders } from '../../context/OrderContext';

export default function StaffPage() {
  const { orders } = useOrders();

  const novos = orders.filter((o) => o.status === 'novo').length;
  const preparando = orders.filter((o) => o.status === 'preparando').length;
  const prontos = orders.filter((o) => o.status === 'pronto').length;
  const mesasAbertas = new Set(orders.map((o) => o.tableNumber)).size;

  return (
    <div className="min-h-screen bg-[#120E0A] text-ivory flex flex-col">
      {/* Header */}
      <header className="bg-[#1E1610] border-b border-primary/10 px-6 py-6 text-center">
        <h1 className="font-serif text-primary text-xl font-bold tracking-wide uppercase">
          The Gilded Archive
        </h1>
        <p className="text-champagne text-sm mt-1">Painel do Funcionario</p>
      </header>

      <main className="flex-1 p-6 max-w-lg mx-auto w-full flex flex-col gap-4">
        {/* Quick stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-[#1E1610] rounded-xl border border-primary/10 p-3 text-center">
            <p className="font-serif text-amber-status font-bold text-2xl">{novos}</p>
            <p className="text-champagne text-[10px] mt-1">Novos</p>
          </div>
          <div className="bg-[#1E1610] rounded-xl border border-primary/10 p-3 text-center">
            <p className="font-serif text-blue-status font-bold text-2xl">{preparando}</p>
            <p className="text-champagne text-[10px] mt-1">Preparo</p>
          </div>
          <div className="bg-[#1E1610] rounded-xl border border-primary/10 p-3 text-center">
            <p className="font-serif text-green-status font-bold text-2xl">{prontos}</p>
            <p className="text-champagne text-[10px] mt-1">Prontos</p>
          </div>
          <div className="bg-[#1E1610] rounded-xl border border-primary/10 p-3 text-center">
            <p className="font-serif text-primary font-bold text-2xl">{mesasAbertas}</p>
            <p className="text-champagne text-[10px] mt-1">Mesas</p>
          </div>
        </div>

        {/* Navigation cards */}
        <Link
          to="/cozinha"
          className="bg-[#1E1610] rounded-2xl border border-primary/10 p-6 flex items-center gap-5 hover:bg-[#241A12] transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-amber-status/10 border border-amber-status/25 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-amber-status text-3xl">soup_kitchen</span>
          </div>
          <div>
            <h2 className="font-serif text-on-surface font-bold text-lg">Cozinha</h2>
            <p className="text-champagne text-sm">Gerenciar pedidos em preparo</p>
          </div>
          <span className="material-symbols-outlined text-primary/40 ml-auto">chevron_right</span>
        </Link>

        <Link
          to="/mesas"
          className="bg-[#1E1610] rounded-2xl border border-primary/10 p-6 flex items-center gap-5 hover:bg-[#241A12] transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">receipt_long</span>
          </div>
          <div>
            <h2 className="font-serif text-on-surface font-bold text-lg">Contas</h2>
            <p className="text-champagne text-sm">Fechar contas e pagamentos</p>
          </div>
          <span className="material-symbols-outlined text-primary/40 ml-auto">chevron_right</span>
        </Link>

        <Link
          to="/"
          className="bg-[#1E1610] rounded-2xl border border-primary/10 p-6 flex items-center gap-5 hover:bg-[#241A12] transition-colors"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
          </div>
          <div>
            <h2 className="font-serif text-on-surface font-bold text-lg">Cardapio</h2>
            <p className="text-champagne text-sm">Ver menu do cliente</p>
          </div>
          <span className="material-symbols-outlined text-primary/40 ml-auto">chevron_right</span>
        </Link>
      </main>
    </div>
  );
}
