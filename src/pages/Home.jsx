import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import Logo from '../components/Logo';
import products from '../data/products.json';
import './Home.css';

function Home() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const categoryFilter = searchParams.get('category');

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return cats.sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchTerm === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.compatibility.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !categoryFilter || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Peças Automotivas de Qualidade</h1>
          <p>Encontre as melhores peças para o seu veículo com os melhores preços do mercado</p>
          <SearchBar onSearch={setSearchTerm} />
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2>Categorias</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <a
                key={category}
                href={`/?category=${category}`}
                className={`category-card ${categoryFilter === category ? 'active' : ''}`}
              >
                <span className="category-icon">
                  {category === 'Acabamento' && '✨'}
                  {category === 'Retrovisores' && '🪞'}
                  {category === 'Interior' && '🪑'}
                  {category === 'Grades' && '🔲'}
                  {category === 'Suspensão' && '🔩'}
                  {category === 'Capô' && '🚗'}
                  {category === 'Iluminação' && '💡'}
                  {category === 'Para-choques' && '🛡️'}
                  {category === 'Acessórios' && '🔧'}
                </span>
                <span className="category-name">{category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {!categoryFilter && !searchTerm && (
        <section className="featured-section">
          <div className="container">
            <h2>Produtos em Destaque</h2>
            <div className="products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="products-section">
        <div className="container">
          <h2>
            {categoryFilter ? `${categoryFilter}` : searchTerm ? 'Resultados da Busca' : 'Todos os Produtos'}
            <span className="product-count">({filteredProducts.length} produtos)</span>
          </h2>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <span className="no-results-icon">😕</span>
              <p>Nenhum produto encontrado</p>
              <a href="/" className="back-link">Ver todos os produtos</a>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-logo">
              <Logo size={100} />
              <p>Sua loja online de autopeças com qualidade garantida e os melhores preços.</p>
            </div>
            <div className="footer-col">
              <h4>Institucional</h4>
              <ul>
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Política de Privacidade</a></li>
                <li><a href="#">Termos de Uso</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Atendimento</h4>
              <ul>
                <li><a href="#">Central de Ajuda</a></li>
                <li><a href="#">Trocas e Devoluções</a></li>
                <li><a href="#">Fale Conosco</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contato</h4>
              <p>📞 (11) 99988-7766</p>
              <p>📧 contato@autopecasstore.com</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 LeG Acessórios LTDA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
