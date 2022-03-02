import axios from "axios";
import authHeader from './auth-header';
// const API_URL = "http://localhost/wp-json/jwt-auth/v1/token/";
// import { domain, API } from '../config/app.json'
import { AUTH_TOKEN } from '../helper';

// const API_URL = domain.env_test.siteUrl + API.WP;
const API_URL = "http://scriptophobia.com/wp-json/jwt-auth/v1/"

class AuthService {
  logIn(username, password) {
    console.log(username, password, 'logIn page API');
    console.log('Auth info => ' , authHeader());
    console.log('api url => ' , API_URL);

    return fetch(API_URL + "token/", {
        
        username : username,
        password : password
      }, { headers: authHeader() })
      .then(response => {
        
        console.log(response);
        console.log('I am here.');
       
        if (response.data.accessToken) {
          localStorage.setItem(AUTH_TOKEN, JSON.stringify(response.data));
          // return true;
        }else{
          // return false;
        }
        debugger;
        // return response.data;
      });
  }

  logOut() {
    localStorage.removeItem(AUTH_TOKEN);
  }

  register(firstname, email, password) {
    return axios.post(API_URL + "signup", {
      firstname,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(AUTH_TOKEN));;
  }
}

export default new AuthService();
