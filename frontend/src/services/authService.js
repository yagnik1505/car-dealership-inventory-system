import api from './api';

const authService = {
  register: async ({ name, email, password }) => {
    const response = await api.post('/api/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  },

  getToken: () => localStorage.getItem('token'),

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
