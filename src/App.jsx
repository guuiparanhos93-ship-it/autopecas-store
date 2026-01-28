import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentError from './pages/PaymentError';
import PaymentPending from './pages/PaymentPending';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pagamento/sucesso" element={<PaymentSuccess />} />
          <Route path="/pagamento/erro" element={<PaymentError />} />
          <Route path="/pagamento/pendente" element={<PaymentPending />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
