import axios from "./index";

let base = "api";

class ManageApi {
  static ListRequest = () => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.get(`${base}/leave_reqs/all`, {
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

    console.log(data);
    return axios.put(
      `${base}/leave_reqs/${data[0]}/approve`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
  }
  static RejectRequest = (data) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.put(
      `${base}/leave_reqs/${data[0]}/reject`,
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
