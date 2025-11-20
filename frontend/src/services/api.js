// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

/**
 * Fetches currency data from the backend API
 * @returns {Promise<Array>} Array of coin objects
 */
export const fetchCoins = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/coins`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};

