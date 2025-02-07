import axios from 'axios';

// Reemplaza con tu URL de API Gateway (la que te dio Serverless)
const BASE_URL = 'https://iyh4sreu3i.execute-api.us-east-1.amazonaws.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;