import axiosClient from "@/api/axiosClient";

const NotificationsApi = {
  getNotifications: (toekn, pageParam, limit) => axiosClient.get("/notification/getNotifications", {
    headers: { token: toekn }, params: {
      offset: pageParam * limit,
      limit,
    },
  }),
  markAsRead: (toekn, notificationId) => axiosClient.post(`/notification/markAsRead`, { notificationId: notificationId }, { headers: { token: toekn } }),
}

export default NotificationsApi;