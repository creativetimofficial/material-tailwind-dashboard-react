import axiosClient from "@/api/axiosClient";

export const AdminApi = {
  getAllUsers: (token) => {
    const url = "/users/";
    return axiosClient.get(url, { headers: { token: token } });
  },

  getAllPromoCodes: (token) => {
    const url = "/getProms";
    return axiosClient.get(url, { headers: { token: token } });
  },

  generatePromoCode: (token, data = {}) => {
    const url = "/createPromocode";
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  blockUser: (token, id, data = {}) => {
    const url = `/blockUser/${id}`;
    return axiosClient.patch(url, data, { headers: { token: token } });
  },
  getRecentSupportSessions: (token) => {
    const url = "/activeSupportSessions";
    return axiosClient.get(url, { headers: { token: token } });
  },

};

export default AdminApi;