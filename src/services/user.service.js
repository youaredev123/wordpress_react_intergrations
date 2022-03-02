import axios from 'axios';
import authHeader from './auth-header';

import { domain, API } from '../config/app.json'
// import { AUTH_TOKEN } from '../helper';
const API_URL = domain.env_test.siteUrl + API.WP + API.VER;

class UserService {
  getPublicContent() {
    console.log(API_URL)
    return axios.get( API_URL );
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();
