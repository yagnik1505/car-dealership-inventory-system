import api from './api';

const vehicleService = {
  getAll: async () => {
    const response = await api.get('/api/vehicles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/vehicles/${id}`);
    return response.data;
  },

  create: async (vehicle) => {
    const response = await api.post('/api/vehicles', vehicle);
    return response.data;
  },

  update: async (id, vehicle) => {
    const response = await api.put(`/api/vehicles/${id}`, vehicle);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/api/vehicles/${id}`);
  },

  search: async (params) => {
    const response = await api.get('/api/vehicles/search', { params });
    return response.data;
  },

  purchase: async (id) => {
    const response = await api.post(`/api/vehicles/${id}/purchase`);
    return response.data;
  },

  restock: async (id, quantity) => {
    const response = await api.post(`/api/vehicles/${id}/restock`, {
      quantity,
    });
    return response.data;
  },
};

export default vehicleService;
