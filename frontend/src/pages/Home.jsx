import { useState, useEffect } from 'react';
import { itemsAPI } from '../services/api';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchItems = async () => {
    setLoading(true);
    try {
      // Use search term from local state, ignore filters.search if empty
      const queryFilters = searchTerm
        ? { ...filters, search: searchTerm }
        : { ...filters, search: '' };
      const response = await itemsAPI.getAll({ ...queryFilters, page: currentPage, limit: 9 });
      setItems(response.data.data);
      setTotalPages(response.data.pages);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchTerm, filters, currentPage]);

  // Live search as you type, auto-resets when cleared
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    // No need to update filters here, it's handled above
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mt-14 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to EcoExchange
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed mb-4">
          Join our community in promoting sustainability. List items you no longer need
          and find treasures others are giving away!
        </p>
      </div>

      <div className="flex justify-center mt-4 mb-10">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
      </div>
      <FilterPanel filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-gray-600">No items found. Be the first to add one!</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} onStatusUpdate={fetchItems} />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
