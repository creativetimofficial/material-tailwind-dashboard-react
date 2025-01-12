import axiosClient from "@/api/axiosClient";

const SignalApi = {
  getAll: (token) => {
    return axiosClient.get('/signal', { headers: { token: token } });
  },
}

export default SignalApi;