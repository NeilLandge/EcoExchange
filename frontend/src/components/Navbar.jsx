import { Link, useLocation } from 'react-router-dom';
import { FaLeaf, FaPlus, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf className="text-primary text-3xl" />
            <span className="text-2xl font-bold text-gray-800">EcoExchange</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                location.pathname === '/'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaHome />
              <span>Home</span>
            </Link>
            
            <Link
              to="/add-item"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                location.pathname === '/add-item'
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaPlus />
              <span>Add Item</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
