import axios from 'axios';

const authApi = axios.create({
  baseURL: '/api/auth/',
});

const login = (user = {}) => authApi.post('login', user);
const logout = () => authApi.post('logout');

export {
  login,
  logout
};
