import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

// Detecta automaticamente se está em produção ou desenvolvimento
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3001/api';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/create-preference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            description: item.description || item.name,
            quantity: item.quantity,
            price: item.price
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento');
      }

      const data = await response.json();

      // Redirecionar para o Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('Link de pagamento não gerado');
      }

    } catch (err) {
      console.error('Erro no checkout:', err);
      setError('Erro ao processar pagamento. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <span className="empty-icon">🛒</span>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos ao carrinho para continuar</p>
            <Link to="/" className="continue-shopping">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Carrinho de Compras</h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <Link to={`/product/${item.id}`} className="item-image">
                  <img src={item.image} alt={item.name} />
                </Link>

                <div className="item-details">
                  <Link to={`/product/${item.id}`} className="item-name">
                    {item.name}
                  </Link>
                  <span className="item-brand">{item.brand}</span>
                </div>

                <div className="item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  <span className="unit-price">
                    R$ {item.price.toFixed(2).replace('.', ',')} un.
                  </span>
                  <span className="total-price">
                    R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                  title="Remover item"
                >
                  ✕
                </button>
              </div>
            ))}

            <button onClick={clearCart} className="clear-cart-btn">
              Limpar Carrinho
            </button>
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>

            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} itens)</span>
              <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="summary-row">
              <span>Frete</span>
              <span className="free-shipping">Grátis</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
            </div>

            <div className="installments-info">
              ou 3x de R$ {(cartTotal / 3).toFixed(2).replace('.', ',')} sem juros
            </div>

            {error && (
              <div className="checkout-error">
                {error}
              </div>
            )}

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processando...' : 'Pagar com Mercado Pago'}
            </button>

            <Link to="/" className="continue-link">
              ← Continuar comprando
            </Link>

            <div className="payment-methods">
              <p>Formas de pagamento:</p>
              <div className="payment-icons">
                <span>💳 Cartão</span>
                <span>📱 Pix</span>
                <span>📄 Boleto</span>
              </div>
            </div>

            <div className="secure-checkout">
              🔒 Pagamento seguro via Mercado Pago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
