import { useEffect, useState } from "react";
import VideoPlayer from "./components/video/VideoPlayer";
import VideoSections from "./components/video/VideoSections";
import data from "./videos.json";
import { useParams } from "react-router-dom";
import ScrollToTopButton from "./components/video/ScrollToTop";
import ContentTabs from "./components/video/ContentTabs";


function Video({ videoLink }) {

	const { id } = useParams();
	const [videoData, setVideoData] = useState(null);


	let video;
	let sections;

	if (id == "1" || id == "2") {
		video = data.find((video) => {
			return video.id == id;
		});
	}

	if (video) {
		sections = video.sections.map((section) => {
			return {
				...section,
				duration: section.end - section.start,
			};
		});
	}

	const [currentSection, setCurrentSection] = useState(null);

	const handleSectionClick = (time) => {
		const player = document.querySelector("video");

		if (player) {
			player.currentTime = time;
			player.play();
		}
	};

	const handleProgress = (playedSeconds) => {
		const section = sections.find((s) => playedSeconds >= s.time);
		if (section) {
			setCurrentSection(section.time);
		}
	};
	function ensureHttps(url) {
		if (!url) return '';
		return url.startsWith('https://') ? url : `https://${url}`;
  }
	return (
		<div
			className={`overflow-hidden w-full flex flex-col justify-start items-center mb-2`}
		>
			<VideoPlayer
				url={videoLink ? ensureHttps(videoLink) : `${ensureHttps(videoData?.lessonVideo)}`}
				sections={video ? sections : null}
				onProgress={video ? handleProgress : () => { }}
			/>
			{
				<VideoSections
					sections={data[1].sections}
					onSectionClick={handleSectionClick}
					currentSection={currentSection}
				/>
			}
			<div className="w-screen fixed right-0 bottom-0 flex justify-end items-center gap-2">
				<ScrollToTopButton />
				<ContentTabs
					sections={data[1].sections}
					onSectionClick={handleSectionClick}
				/>
			</div>
		</div>
	);
}

export default Video;
