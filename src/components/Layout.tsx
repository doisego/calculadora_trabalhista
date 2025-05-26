import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { path: '/', label: 'Início' },
    { path: '/fgts', label: 'FGTS' },
    { path: '/decimo-terceiro', label: 'Décimo Terceiro' },
    { path: '/ferias', label: 'Férias' },
    { path: '/rescisao', label: 'Rescisão' },
    { path: '/salario-liquido', label: 'Salário Líquido' },
    { path: '/sobre', label: 'Sobre' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculadoras Trabalhistas
          </Link>
          
          {/* Menu para dispositivos móveis */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Menu para desktop */}
          <nav className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  location.pathname === item.path 
                    ? 'bg-blue-700 text-white' 
                    : 'text-white hover:bg-blue-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Menu móvel expandido */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-700 px-4 py-2 shadow-lg">
            {menuItems.map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`block py-2 px-2 rounded ${
                  location.pathname === item.path 
                    ? 'bg-blue-800 text-white' 
                    : 'text-white hover:bg-blue-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </header>
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Calculadoras Trabalhistas</h3>
              <p className="text-gray-400">
                Ferramentas para cálculos trabalhistas conforme a legislação brasileira.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Início</Link></li>
                <li><Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</Link></li>
                <li><a href="https://www.gov.br/trabalho-e-previdencia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Ministério do Trabalho</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Aviso Legal</h3>
              <p className="text-gray-400">
                Este site é apenas para fins informativos e não substitui a consulta a um profissional especializado.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Calculadoras Trabalhistas - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
