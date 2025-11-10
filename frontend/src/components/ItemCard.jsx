import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaExchangeAlt, FaCheckCircle } from 'react-icons/fa';
import { itemsAPI } from '../services/api';
import { toast } from 'react-toastify';

const ItemCard = ({ item, onStatusUpdate }) => {
  const handleStatusToggle = async () => {
    try {
      const newStatus = item.status === 'available' ? 'exchanged' : 'available';
      await itemsAPI.updateStatus(item._id, newStatus);
      toast.success(`Item marked as ${newStatus}`);
      onStatusUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="card group">
      <Link to={`/item/${item._id}`}>
        <div className="relative overflow-hidden rounded-lg mb-4 h-48">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
          />
          <span className={`absolute top-2 right-2 ${
            item.status === 'available' ? 'badge-available' : 'badge-exchanged'
          }`}>
            {item.status === 'available' ? 'Available' : 'Exchanged'}
          </span>
        </div>
      </Link>

      <Link to={`/item/${item._id}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-primary transition">
          {item.name}
        </h3>
      </Link>

      <div className="flex items-center text-gray-600 mb-2">
        <FaMapMarkerAlt className="mr-2 text-primary" />
        <span className="text-sm">{item.location}</span>
      </div>

      <div className="mb-3">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
          {item.condition}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {item.description}
      </p>

      <button
        onClick={handleStatusToggle}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
          item.status === 'available'
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-500 hover:bg-gray-600 text-white'
        }`}
      >
        {item.status === 'available' ? (
          <>
            <FaCheckCircle />
            <span>Mark as Exchanged</span>
          </>
        ) : (
          <>
            <FaExchangeAlt />
            <span>Mark as Available</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ItemCard;
