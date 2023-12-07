import axios from "./index";

class AuthApi {
  static Login = (data) => {
    return axios.post(`api/auth/login`, data);
  };

  static Register = (data) => {
    return axios.post(`api/auth/signup`, data);
  };

  static Logout = (data) => {
    // return axios.post(`$/logout`, data, { headers: { Authorization: `${data.token}` } });
    return
  };
}


export default AuthApi;
