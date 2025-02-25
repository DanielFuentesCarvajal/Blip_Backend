const axios = require('axios');

const { userServiceBaseUrl, authServiceBaseUrl, clubServiceBaseUrl } = require('../config/constants');

const httpService = {
  post: async (url, data) => {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  },
  get: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error.message;
    }
  },
};

module.exports = { httpService, userServiceBaseUrl, authServiceBaseUrl, clubServiceBaseUrl  };