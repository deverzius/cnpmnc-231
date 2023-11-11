import axios from "./index";

let base = "api";

class ManageApi {
  static ListRequest = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.get(`${base}/leavereqs/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  static ApproveRequest = (data) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.put(
      `${base}/leavereqs/approve`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  static Logout = (data) => {
    return axios.post(`${base}/logout`, data, {
      headers: { Authorization: `${data.token}` },
    });
  };
}

export default ManageApi;
