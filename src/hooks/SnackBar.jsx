import { createContext, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "./LangContext";
import { X } from "lucide-react";

const SnackbarContext = createContext();

export const useSnackbar = () => {
	return useContext(SnackbarContext);
};

// Function to detect and convert URLs to anchor tags
const formatMessageWithLinks = (message) => {
	const urlRegex = /(https?:\/\/[^\s]+)/g;
	return message.split(urlRegex).map((part, index) => {
		if (part.match(urlRegex)) {
			return (
				<a
					key={index}
					href={part}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-300 underline hover:text-blue-200"
				>
					{part}
				</a>
			);
		}
		return part;
	});
};

export const SnackbarProvider = ({ children }) => {
	const { lang } = useLang();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarTitle, setSnackbarTitle] = useState("");
	const [snackbarType, setSnackbarType] = useState("default");

	const openSnackbar = (message, options = {}) => {
		const { title = "", type = "default" } = options;

		setSnackbarMessage(message);
		setSnackbarTitle(title);
		setSnackbarType(type);
		setSnackbarOpen(true);

		setTimeout(() => {
			closeSnackbar();
		}, options.duration || 6000);
	};

	const closeSnackbar = () => {
		setSnackbarOpen(false);
		setSnackbarMessage("");
		setSnackbarTitle("");
		setSnackbarType("default");
	};

	const getTypeStyles = (type) => {
		switch (type) {
			case "success":
				return "bg-green-600";
			case "error":
				return "bg-red-600";
			case "warning":
				return "bg-yellow-600";
			case "signal":
				return "animated-gradient";
			default:
				return "bg-[#6240c0]";
		}
	};

	const variants = {
		initial: {
			x: lang === "ar" ? "-100%" : "100%",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
		exit: {
			x: lang === "ar" ? "-100%" : "100%",
			opacity: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				damping: 20,
			},
		},
	};

	return (
		<SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
			{children}
			<AnimatePresence>
				{snackbarOpen && (
					<motion.div
						className={`fixed z-[99999] max-w-[400px] top-44 ${
							lang === "ar" ? "left-10" : "right-10"
						} w-fit mx-auto rounded-lg ${getTypeStyles(
							snackbarType
						)} text-white text-lg font-semibold p-4`}
						initial="initial"
						animate="animate"
						exit="exit"
						variants={variants}
					>
						<div className="relative"></div>
						<button
							onClick={closeSnackbar}
							className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
							aria-label="Close notification"
						>
							<X size={16} />
						</button>
						{snackbarTitle && (
							<h3 className="font-bold mb-2 pr-6">{snackbarTitle}</h3>
						)}
						<p className="pr-6">{formatMessageWithLinks(snackbarMessage)}</p>
					</motion.div>
				)}
			</AnimatePresence>
		</SnackbarContext.Provider>
	);
};
