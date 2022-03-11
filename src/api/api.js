import axios from "axios";

const api = async (method, path) => {
  const response = await axios({
    method,
    url: `${path}&apiKey=${process.env.REACT_APP_API_KEY}`,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export default api;
