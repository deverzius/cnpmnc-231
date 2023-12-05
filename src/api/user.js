import axios from "./index";

let base = "api";

class UserApi {
  static getInfo = (id) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user?.token);
    return axios.get(`${base}/users/info`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  static getInfoForAdmin = (id) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user?.token);
    return axios.get(`${base}/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  static ListRequest = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log(user?.token);
    return axios.get(`${base}/leave_reqs/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, {
      headers: { Authorization: `${data.token}` },
    });
  };
}

export default UserApi;
