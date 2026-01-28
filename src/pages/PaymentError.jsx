import { Link, useSearchParams } from 'react-router-dom';
import './PaymentResult.css';

function PaymentError() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  return (
    <div className="payment-result error">
      <div className="result-container">
        <div className="result-icon">✕</div>
        <h1>Pagamento não aprovado</h1>
        <p>Infelizmente não foi possível processar seu pagamento.</p>

        {status && (
          <div className="payment-info">
            <p><strong>Status:</strong> {status}</p>
          </div>
        )}

        <div className="result-message">
          <p>Possíveis motivos:</p>
          <ul>
            <li>Cartão recusado pela operadora</li>
            <li>Limite insuficiente</li>
            <li>Dados incorretos</li>
          </ul>
        </div>

        <div className="result-actions">
          <Link to="/cart" className="btn-primary">
            Tentar Novamente
          </Link>
          <Link to="/" className="btn-secondary">
            Voltar para a Loja
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentError;
