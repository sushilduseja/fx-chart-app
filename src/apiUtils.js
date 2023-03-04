import axios from 'axios';

const API_BASE_URL = 'https://www.alphavantage.co';
const API_KEY = 'your-api-key'; // replace this with your actual API key

const apiUtils = {
  get: async (url, params) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${url}`, { params: { ...params, apikey: API_KEY } });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data from API');
    }
  }
};

export default apiUtils;
