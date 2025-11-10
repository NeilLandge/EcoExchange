import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Items API
export const itemsAPI = {
  // Get all items with filters
  getAll: (params = {}) => api.get('/items', { params }),
  
  // Get single item
  getById: (id) => api.get(`/items/${id}`),
  
  // Create new item
  create: (data) => api.post('/items', data),
  
  // Update item status
  updateStatus: (id, status) => api.put(`/items/${id}`, { status }),
  
  // Delete item
  delete: (id) => api.delete(`/items/${id}`),
};

export default api;
