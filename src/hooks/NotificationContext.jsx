import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

export const NotificationContextApi = createContext();

export const useNotificationsApi = () => {
	return useContext(NotificationContextApi);
};

const UseNotificationsProvider = ({ children }) => {
	const [unseenNotifications, setUnseenNotifications] = useState([]);
	const [unseenCount, setUnseenCount] = useState(0);

	return (
		<NotificationContextApi.Provider
			value={{
				unseenNotifications,
				setUnseenCount,
				unseenCount,
				setUnseenNotifications,
			}}
		>
			{children}
		</NotificationContextApi.Provider>
	);
};

UseNotificationsProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default UseNotificationsProvider;
