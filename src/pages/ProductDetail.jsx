import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produto não encontrado</h2>
        <Link to="/" className="back-btn">Voltar para a loja</Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="product-detail">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Início</Link>
          <span>/</span>
          <Link to={`/?category=${product.category}`}>{product.category}</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-main">
          <div className="product-gallery">
            {discount > 0 && <span className="discount-tag">-{discount}%</span>}
            <img src={product.image} alt={product.name} className="main-image" />
          </div>

          <div className="product-info">
            <span className="product-brand">{product.brand}</span>
            <h1 className="product-title">{product.name}</h1>
            <span className="product-category-tag">{product.category}</span>

            <div className="product-price-section">
              {product.originalPrice && (
                <span className="old-price">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="price">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="installments">
                ou 3x de R$ {(product.price / 3).toFixed(2).replace('.', ',')} sem juros
              </span>
            </div>

            <div className="stock-info">
              {product.stock > 10 ? (
                <span className="in-stock">✓ Em estoque ({product.stock} unidades)</span>
              ) : product.stock > 0 ? (
                <span className="low-stock">⚠ Últimas unidades ({product.stock} restantes)</span>
              ) : (
                <span className="out-of-stock">✗ Fora de estoque</span>
              )}
            </div>

            <div className="quantity-selector">
              <label>Quantidade:</label>
              <div className="quantity-controls">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`add-to-cart-button ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {addedToCart ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
            </button>

            <Link to="/cart" className="go-to-cart-link">
              Ver carrinho →
            </Link>
          </div>
        </div>

        <div className="product-details-section">
          <div className="detail-block">
            <h2>Descrição</h2>
            <p>{product.description}</p>
          </div>

          <div className="detail-block">
            <h2>Compatibilidade</h2>
            <ul className="compatibility-list">
              {product.compatibility.map((item, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2>Produtos Relacionados</h2>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <Link to={`/product/${p.id}`} key={p.id} className="related-card">
                  <img src={p.image} alt={p.name} />
                  <h4>{p.name}</h4>
                  <span className="related-price">
                    R$ {p.price.toFixed(2).replace('.', ',')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
