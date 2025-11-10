import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemsAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCalendar, FaSpinner, FaArrowLeft } from 'react-icons/fa';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await itemsAPI.getById(id);
      setItem(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch item details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async () => {
    try {
      const newStatus = item.status === 'available' ? 'exchanged' : 'available';
      await itemsAPI.updateStatus(item._id, newStatus);
      toast.success(`Item marked as ${newStatus}`);
      setItem({ ...item, status: newStatus });
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-primary" />
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-gray-600 hover:text-primary mb-6 transition"
      >
        <FaArrowLeft />
        <span>Back to Items</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-96 md:h-full">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 right-4 ${
              item.status === 'available' ? 'badge-available' : 'badge-exchanged'
            } text-lg`}>
              {item.status === 'available' ? 'Available' : 'Exchanged'}
            </span>
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{item.name}</h1>

            <div className="flex items-center text-gray-600 mb-4">
              <FaMapMarkerAlt className="mr-2 text-primary text-xl" />
              <span className="text-lg">{item.location}</span>
            </div>

            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                Condition: {item.condition}
              </span>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>

            <div className="flex items-center text-gray-500 mb-8">
              <FaCalendar className="mr-2" />
              <span>Listed on {new Date(item.createdAt).toLocaleDateString()}</span>
            </div>

            <button
              onClick={handleStatusToggle}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition ${
                item.status === 'available'
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-500 hover:bg-gray-600 text-white'
              }`}
            >
              {item.status === 'available' ? 'Mark as Exchanged' : 'Mark as Available'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
