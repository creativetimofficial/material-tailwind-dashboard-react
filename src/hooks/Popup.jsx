import { createContext, useEffect, useState, useContext } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

export const PopupContext = createContext();
export const usePopup = () => {
	return useContext(PopupContext);
};

export const PopupProvider = ({ children }) => {
	const [component, setComponent] = useState();

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setComponent(null);
			}
		};

		const handlePopState = () => {
			setComponent(null);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("popstate", handlePopState);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("popstate", handlePopState);
		};
	}, []);

	class popup {
		run(e) {
			setComponent(e);
		}
		close() {
			setComponent(null);
		}
	}

	return (
		<>
			<PopupContext.Provider value={{ popup: new popup() }}>
				{component && (
					<div className="fixed z-[99999] left-0 top-0 w-screen h-screen">
						<div className="relative w-full h-full flex justify-center items-center backdrop-blur-sm bg-black/60">
							<div
								onClick={() => setComponent(null)}
								className="absolute w-full h-full z-10"
							></div>
							<div className="absolute z-20 justify-center items-center">
								<div className="relative justify-center items-center">
									<div className="block">{component}</div>
								</div>
							</div>
						</div>
					</div>
				)}
				{children}
			</PopupContext.Provider>
		</>
	);
};
