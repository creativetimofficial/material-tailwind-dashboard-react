import axiosClient from "@/api/axiosClient";


export const AuthApi = {

  SignIn: (data) => {
    const url = "/auth/user/signIn";
    return axiosClient.post(url, data);
  },

  SignUp: (data) => {
    const url = "/auth/user/signup";
    return axiosClient.post(url, data);
  },

  forGotPassword: (data) => {
    const url = "/user/forgotPassword";
    return axiosClient.post(url, data);
  },

  reset: (data) => {
    const url = "/user/reset/";
    return axiosClient.post(url, data)
  },

  verifyPromocode: (data) => {
    const url = "/auth/verifyPromocode";
    return axiosClient.post(url, data, { headers: { 'Content-Type': "application/json" } });
  },

  getTree: (token, id) => {
    const url = "/auth/getAllChildren";
    return axiosClient.get(url, { headers: { token: token }, params: { educator: id } });
  },

  contactUs: (data, token) => {
    const url = "/contactus";
    return axiosClient.post(url, data, { headers: { token: token } });
  },

  getContactUs: (token, limit, page) => {
    const url = "/contactus";
    return axiosClient.get(url, { headers: { token: token }, params: { limit: limit, page: page } });
  },

  getUserData: (token) => {
    const url = "/user/user/profile";
    return axiosClient.get(url, { headers: { token: token } });
  },

  EditUserData: (data, token) => {
    const url = "/user/updateProfile";
    return axiosClient.patch(url, data, { headers: { token: token } });
  },

}

export default AuthApi;