/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link, List } from "lucide-react";
import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

function ContentTabs({ sections, onSectionClick }) {
	const linksRef = useRef(null);
	const contentRef = useRef(null);
	const [showLinks, setShowLinks] = useState(false);
	const [showContent, setShowContent] = useState(false);
	const [dataToShow, setDataToShow] = useState([]);

	function handleDataToShow(e) {
		if (e.target === linksRef.current) {
			setShowLinks((prev) => !prev);
			setShowContent(false);
		} else if (e.target === contentRef.current) {
			setShowLinks(false);
			setShowContent((prev) => !prev);
			setDataToShow(sections);
		}
	}

	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	}

	const sectionClick = (time) => {
		onSectionClick(time);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<motion.div className="fixed right-0 bottom-0 z-20 flex flex-col w-full lg:w-1/4 rounded-tl-xl rounded-tr-xl  shadow-[#333] shadow-xl ">
			<div className="w-full flex justify-center items-center gap-0 bg-[#0a0128] rounded-tl-xl rounded-tr-xl">
				<div
					ref={linksRef}
					onClick={handleDataToShow}
					className={`w-1/2 px-4 py-3 bg-[#0a0128] hover:hover:bg-[#2c2155] rounded-tl-xl rounded-tr-xl cursor-pointer ${
						showLinks ? "bg-[#2c2155]" : ""
					}`}
				>
					<span className="flex justify-start items-center gap-2 pointer-events-none">
						<Link color="#8b8b8b" />
						<span className="text-white font-bold font-inter">
							Lesson&apos;s Links
						</span>
					</span>
				</div>
				<div
					ref={contentRef}
					onClick={handleDataToShow}
					className={`w-1/2 px-4 py-3 bg-[#0a0128] hover:hover:bg-[#2c2155] rounded-tr-xl cursor-pointer ${
						showContent ? "bg-[#2c2155]" : ""
					}`}
				>
					<span className="flex justify-start items-center gap-2 pointer-events-none">
						<List color="#8b8b8b" />
						<span className="text-white font-bold font-inter">
							Table of content
						</span>
					</span>
				</div>
			</div>
			<motion.div
				initial={{ opacity: 0, height: 0 }}
				animate={{ opacity: 1, height: showLinks || showContent ? 500 : 0 }}
				exit={{ opacity: 0, height: 0 }}
				transition={{ duration: 0.5 }}
				className={`bg-[#222] flex flex-col justify-start items-start gap-4 ${
					showLinks || showContent ? "p-5" : "p-0"
				}`}
				style={{
					overflowY: "auto",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				{showLinks &&
					sections?.map((section) => (
						<div key={section.id}>
							<h3 className="text-white">{section.title}</h3>
							<ul>
								{section.links.map((link, linkIndex) => (
									<>
										<li key={linkIndex}>
											<a
												href={link}
												target="_blank"
												rel="noreferrer"
												className="text-[#b08aff] hover:underline"
											>
												{link}
											</a>
										</li>
									</>
								))}
							</ul>
						</div>
					))}
				{showContent &&
					dataToShow.map((section) => (
						<>
							<a
								href={"#" + section.title.replace(" ", "-")}
								key={section.id}
								className="group flex justify-start items-center gap-5 text-white"
							>
								<h1 className="font-bold font-inter">{section.title}</h1>
								<span
									onClick={() => sectionClick(section.start)}
									className="text-xs font-medium hidden group-hover:flex justify-center items-center gap-2 hover:text-gray-100 px-2 py-0.5 border border-gray-400 rounded-2xl hover-border-gray-100"
								>
									<FaPlay />
									<span>{formatTime(section.start)}</span>
								</span>
							</a>
						</>
					))}
			</motion.div>
		</motion.div>
	);
}

export default ContentTabs;
