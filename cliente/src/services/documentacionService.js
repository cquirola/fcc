import axios from 'axios';
import { API_URL } from './apiConfig';
const getDocumentaciones = () => {
  return axios.get(`${API_URL}/documentacion`);
};

const getDocumentacionById = (id) => {
  return axios.get(`${API_URL}/documentacion/${id}`);
};

const deleteDocumentacion = (id) => {
  return axios.delete(`${API_URL}/documentacion/${id}`);
};

const getTipoDocumentacion = () => {
  return axios.get(`${API_URL}/tipo_documentacion`);
}

const createDocumentacion = (documentacion) => {
  const logData = {};
  for (let {key, value} of documentacion.entries()) {
    logData[key] = value;
  }
  return axios.post(`${API_URL}/documentacion`, documentacion, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  } )
};

const updateDocumentacion = (id, documentacion) => {
  return axios.put(`${API_URL}/documentacion/${id}`, documentacion, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const documentacionService = {
  getDocumentaciones,
  getDocumentacionById,
  deleteDocumentacion,
  createDocumentacion,
  updateDocumentacion,
  getTipoDocumentacion,
};

export default documentacionService;
