import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './PaymentResult.css';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    // Limpar carrinho após pagamento aprovado
    clearCart();
  }, [clearCart]);

  return (
    <div className="payment-result success">
      <div className="result-container">
        <div className="result-icon">✓</div>
        <h1>Pagamento Aprovado!</h1>
        <p>Seu pedido foi confirmado com sucesso.</p>

        {paymentId && (
          <div className="payment-info">
            <p><strong>ID do Pagamento:</strong> {paymentId}</p>
            <p><strong>Status:</strong> {status || 'Aprovado'}</p>
          </div>
        )}

        <div className="result-message">
          <p>Você receberá um e-mail com os detalhes do pedido e informações de envio.</p>
        </div>

        <div className="result-actions">
          <Link to="/" className="btn-primary">
            Continuar Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
