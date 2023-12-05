import axios from "./index";

let base = "api";

class EmployeeApi {
  static SubmitRequest = (data) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    // console.log('Leave requests', JSON.stringify(data));
    // console.log(user?.token);
    return axios.post(`${base}/leave_reqs`, JSON.stringify(data), {
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

export default EmployeeApi;
