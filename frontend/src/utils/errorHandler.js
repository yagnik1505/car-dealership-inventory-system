export const extractErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.message === 'Network Error') {
    return 'Unable to connect to the server. Please check your connection.';
  }

  if (error.code === 'ECONNABORTED') {
    return 'Request timed out. Please try again.';
  }

  return error.message || 'An unexpected error occurred';
};
