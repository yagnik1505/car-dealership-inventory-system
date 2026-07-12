import api from './api';

export const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

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
    localStorage.removeItem('userRole');
  },

  getToken: () => localStorage.getItem('token'),

  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  isAuthenticated: () => !!localStorage.getItem('token'),
};

export default authService;
