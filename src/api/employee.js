import axios from "./index";

let base = "api";

class EmployeeApi {
  static SubmitRequest = (data) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    return axios.post(`${base}/leavereqs`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };
  static ListRequest = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    return axios.get(`${base}/leavereqs/all`, {
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

export default EmployeeApi;
