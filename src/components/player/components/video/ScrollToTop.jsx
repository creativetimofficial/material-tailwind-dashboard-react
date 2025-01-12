import { ArrowDownToLine } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const showButton = scrollY > window.innerHeight * 0.2;
			setIsVisible(showButton);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (window.innerWidth <= 768) {
			setIsMobile(true);
		}
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<motion.button
			animate={
				isMobile ? { x: isVisible ? 40 : 100 } : { y: isVisible ? 0 : 100 }
			}
			transition={{ duration: 0.2 }}
			className={`fixed lg:bottom-0 bottom-20 lg:right-[26%] right-10 z-10 rounded-tl-xl rounded-bl-xl md:rounded-bl-none md:rounded-tr-xl p-3 bg-[#0a0128] hover:bg-[#2c2155] focus:outline-none transition-all duration-300 `}
			onClick={scrollToTop}
		>
			<ArrowDownToLine className="text-base rotate-180 text-[#8b8b8b]" />
		</motion.button>
	);
};

export default ScrollToTopButton;
