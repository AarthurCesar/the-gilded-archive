import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { generatePixBRCode, DEFAULT_PIX_CONFIG } from '../../utils/pix';
import { formatPrice } from '../../utils/format';

interface Props {
  tableNumber: number;
  total: number;
  onClose: () => void;
  onConfirmPaid: () => void;
}

export default function PixPayment({ tableNumber, total, onClose, onConfirmPaid }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [brCode, setBrCode] = useState('');

  useEffect(() => {
    const txId = `MESA${tableNumber}T${Date.now().toString().slice(-8)}`;
    const code = generatePixBRCode(DEFAULT_PIX_CONFIG, total, txId);
    setBrCode(code);

    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, code, {
        width: 260,
        margin: 2,
        color: { dark: '#1A120B', light: '#FFFFFF' },
      });
    }
  }, [tableNumber, total]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(brCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#1E1610] rounded-2xl border border-primary/15 max-w-sm w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-primary text-3xl">pix</span>
          </div>
          <h2 className="font-serif text-on-surface font-bold text-xl">Pagamento PIX</h2>
          <p className="text-champagne text-sm mt-1">Mesa {tableNumber}</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center px-6 py-4">
          <div className="bg-white rounded-xl p-3">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Total */}
        <div className="text-center px-6">
          <p className="text-champagne text-xs uppercase tracking-wider">Valor total</p>
          <p className="font-serif text-primary font-bold text-3xl mt-1">{formatPrice(total)}</p>
        </div>

        {/* Copy code */}
        <div className="px-6 pt-4">
          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-full border border-primary/20 text-champagne text-sm font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Copiado!' : 'Copiar codigo PIX'}
          </button>
        </div>

        {/* Actions */}
        <div className="p-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-full border border-primary/20 text-champagne font-medium text-sm hover:bg-primary/5 transition-all"
          >
            Voltar
          </button>
          <button
            onClick={onConfirmPaid}
            className="flex-1 py-3 rounded-full bg-green-status text-white font-semibold text-sm hover:bg-green-status/90 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">check</span>
            Pago
          </button>
        </div>
      </div>
    </div>
  );
}
