import axiosClient from "@/api/axiosClient";


const PackagesApi = {
  getAll: () => {
    return axiosClient.get('/package');
  },
  add: (data, token) => {
    return axiosClient.post('/package/create', data, { headers: { token: token }, "Content-Type": 'multipart/form-data' });
  },
  getPackage: (id) => {
    return axiosClient.get(`/package/${id}`);
  },
  deletePackage: (id, token) => {
    return axiosClient.delete(`/package/${id}`, { headers: { token: token } });
  },
  updatePackage: (id, data, token) => {
    return axiosClient.put(`/package/${id}`, data, { headers: { token: token }, "Content-Type": 'multipart/form-data' });
  },
  subscribeToPackage: (id, token) => {
    return axiosClient.post(`/package/subscribe/${id}`, {}, { headers: { token: token } });
  },
  myPackages: (token) => {
    return axiosClient.get('/package/my-packages/myPackages', { headers: { token: token } });
  },
}

export default PackagesApi;