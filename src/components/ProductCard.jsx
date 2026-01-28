import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {discount > 0 && <span className="discount-badge">-{discount}%</span>}

      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">{product.name}</h3>
        <span className="product-category">{product.category}</span>

        <div className="product-pricing">
          {product.originalPrice && (
            <span className="original-price">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
          <span className="current-price">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
