/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useNotificationsApi } from "./NotificationContext";
import { useSnackbar } from "./SnackBar";

export const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const EXPIRATION_TIME = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

const storeWithExpiration = (key, value) => {
	const data = {
		value,
		expiry: Date.now() + EXPIRATION_TIME,
	};
	localStorage.setItem(key, JSON.stringify(data));
};

const retrieveWithExpiration = (key) => {
	const storedData = localStorage.getItem(key);
	if (!storedData) return null;

	const { value, expiry } = JSON.parse(storedData);

	if (Date.now() > expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return value;
};

export const AuthProvider = ({ children }) => {
	const nav = useNavigate()
	const [auth, setAuth] = useState(() => retrieveWithExpiration("auth"));
	const {
		unseenNotifications,
		setUnseenCount,
		unseenCount,
		setUnseenNotifications,
	} = useNotificationsApi();
	const { openSnackbar } = useSnackbar();
	const [account, setAccount] = useState(() =>
		retrieveWithExpiration("account")
	);
	const socket = io(import.meta.env.VITE_BASEURL, {
		// const socket = io("https://sea-turtle-app-rwcjs.ondigitalocean.app", {
		auth: { token: auth },
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
	});

	useEffect(() => {
		if (!socket || !account) return;
		socket.on("connect", () => {
			// console.log("Socket connected on notify:", socket.connected); // Should log `true` if connected
		});
		if (account) {
			// console.log(account._id);
			// console.log(socket.on("manga"));
			socket.on("signalRecive", (data) => {
				openSnackbar(data.message, {
					title: data.signalTitle,
					type: "signal",
					duration: 10000,
				});
				setUnseenNotifications((prev) => [data, ...prev]);
				setUnseenCount((prev) => prev + 1);
			});
			socket.on("newCampaign", (data) => {
				openSnackbar(data.message, {
					title: data.title,
					type: "success",
					duration: 10000,
				});
				// console.log(data, "newCampaign");
				// setUnseenNotifications((prev) => [data, ...prev]);
				// setUnseenCount((prev) => prev + 1);
			});
		}
		return () => {
			socket.off("signalRecive");
			socket.off("newCampaign");
		};
	}, [socket, account]);
	const reconnectSocket = () => {
		if (socket && socket.disconnected) {
			socket.connect();
			console.log(socket, "socket");
		}
	};
	const [search, setSearch] = useState();

	useEffect(() => {
		if (auth) {
			storeWithExpiration("auth", auth);
		}
	}, [auth]);

	useEffect(() => {
		if (account) {
			storeWithExpiration("account", account);
		}
	}, [account]);

	const signout = () => {
		setAuth(null);
		setAccount(null);
		localStorage.removeItem("auth");
		localStorage.removeItem("account");
		localStorage.removeItem("authToken");
		nav("/auth/sign-in")
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				account,
				setAccount,
				search,
				setSearch,
				signout,
				socket,
				reconnectSocket,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
