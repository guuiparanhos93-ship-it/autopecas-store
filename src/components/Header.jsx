import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Logo from './Logo';
import './Header.css';

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <Logo size={45} />
        </Link>

        <nav className="nav-links">
          <Link to="/">Início</Link>
          <Link to="/?category=Acabamento">Acabamento</Link>
          <Link to="/?category=Retrovisores">Retrovisores</Link>
          <Link to="/?category=Interior">Interior</Link>
          <Link to="/?category=Grades">Grades</Link>
        </nav>

        <Link to="/cart" className="cart-button">
          <span className="cart-icon">🛒</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </header>
  );
}

export default Header;
