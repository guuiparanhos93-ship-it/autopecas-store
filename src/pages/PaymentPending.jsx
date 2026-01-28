import { Link, useSearchParams } from 'react-router-dom';
import './PaymentResult.css';

function PaymentPending() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');

  return (
    <div className="payment-result pending">
      <div className="result-container">
        <div className="result-icon">⏳</div>
        <h1>Pagamento Pendente</h1>
        <p>Seu pagamento está sendo processado.</p>

        {paymentId && (
          <div className="payment-info">
            <p><strong>ID do Pagamento:</strong> {paymentId}</p>
          </div>
        )}

        <div className="result-message">
          <p>Se você escolheu pagar com boleto ou PIX:</p>
          <ul>
            <li>O prazo para pagamento do boleto é de até 3 dias úteis</li>
            <li>O PIX deve ser pago em até 30 minutos</li>
            <li>Após a confirmação, você receberá um e-mail</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/" className="btn-primary">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentPending;
