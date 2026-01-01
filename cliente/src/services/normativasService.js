import axios from 'axios';
import { API_URL } from './apiConfig';

const getNormativas = () => {
  return axios.get(`${API_URL}/normativa`);
};

const deleteNormativa = (id) => {
  return axios.delete(`${API_URL}/normativa/${id}`);
};

const normativaServices={
    getNormativas, deleteNormativa
}
export default normativaServices;