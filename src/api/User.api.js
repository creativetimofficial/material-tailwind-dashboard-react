import axiosClient from "@/api/axiosClient";

const UserApi = {
  getTeam: (token) => {
    const url = "/user/team/2";
    return axiosClient.get(url, { headers: { token: token }});
  },
  getAdminTeam: (token) => {
    const url = "/user/team/admin";
    return axiosClient.get(url, { headers: { token: token }});
  },
}

export default UserApi;