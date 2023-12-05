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

  static getRequest = (id) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.get(`${base}/leave_reqs/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
  };

  static updateRequest = (id, data) => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);
    return axios.put(`${base}/leave_reqs/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
  };

  static ApproveRequest = (data) => {
    if (!data.leaveReqIds || data.leaveReqIds.length === 0)
    {
      alert("Please select at least one request to approve");
      return [];
    }

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(user?.token);

    console.log(data);
    return axios.put(
      `${base}/leave_reqs/approves`,
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
    if (!data.leaveReqIds || data.leaveReqIds.length === 0)
    {
      alert("Please select at least one request to reject");
      return [];
    }

    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    return axios.put(
      `${base}/leave_reqs/rejects`,
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
