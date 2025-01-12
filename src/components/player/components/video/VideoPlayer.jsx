import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { Play, Pause, Maximize, VolumeX, Volume2 } from 'lucide-react';
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Existing control button component
const ControlButton = memo(({ onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className="text-white hover:text-[#7C69FF] transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label={label}
    >
        <Icon className="w-6 h-6" />
    </button>
));

// Time display component
const TimeDisplay = memo(({ currentTime, duration }) => (
    <div className="text-white text-sm font-medium">
        <span>{formatTime(currentTime)}</span>
        <span className="mx-1">/</span>
        <span>{formatTime(duration)}</span>
    </div>
));

// Memoized progress bar component
const ProgressBar = memo(({ progress, buffered, onSeek, progressBarRef }) => (
    <div
        ref={progressBarRef}
        className="relative w-full h-2 bg-gray-600 cursor-pointer rounded-full group"
        onClick={onSeek}
    >
        {buffered.map((range, index) => (
            <div
                key={index}
                className="absolute h-full bg-gray-400 rounded-full"
                style={{
                    left: `${range.start}%`,
                    width: `${range.end - range.start}%`
                }}
            />
        ))}
        <div
            className="absolute h-full bg-[#7C69FF] rounded-full"
            style={{ width: `${progress}%` }}
        >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#7C69FF] rounded-full scale-0 group-hover:scale-100 transition-transform" />
        </div>
    </div>
));

const VolumeControl = memo(({ volume, isMuted, onVolumeChange, onMuteToggle }) => {
    const volumeBarRef = useRef(null);

    const handleVolumeClick = (e) => {
        const rect = volumeBarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        onVolumeChange(Math.max(0, Math.min(1, pos)));
    };

    return (
        <div className="flex items-center gap-2 group relative">
            <button
                onClick={onMuteToggle}
                className="text-white hover:text-[#7C69FF] transition-colors p-2 rounded-full hover:bg-white/10"
            >
                {isMuted || volume === 0 ? (
                    <VolumeX className="w-6 h-6" />
                ) : (
                    <Volume2 className="w-6 h-6" />
                )}
            </button>
            <div className="w-0 group-hover:w-24 overflow-hidden transition-all duration-300">
                <div
                    ref={volumeBarRef}
                    className="w-24 h-2 bg-gray-600 rounded-full cursor-pointer"
                    onClick={handleVolumeClick}
                >
                    <div
                        className="h-full bg-[#7C69FF] rounded-full relative"
                        style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#7C69FF] rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
});

const ActionOverlay = memo(({ action, visible }) => {
    const icons = {
        play: <Play className="w-16 h-16" />,
        pause: <Pause className="w-16 h-16" />,
        forward: <TbRewindForward10 className="w-16 h-16" />,
        backward: <TbRewindBackward10 className="w-16 h-16" />
    };

    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
            bg-black/50 rounded-full p-4 text-white
            transition-all duration-200 
            ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
            {icons[action]}
        </div>
    );
});

const VideoPlayer = ({ url }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [buffered, setBuffered] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const containerRef = useRef(null);
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const progressUpdateRef = useRef(null);
    const [overlay, setOverlay] = useState({ action: null, visible: false });

    // Performance optimized progress update
    const updateProgress = useCallback(() => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
            setCurrentTime(videoRef.current.currentTime);
            progressUpdateRef.current = requestAnimationFrame(updateProgress);
        }
    }, []);

    // Add duration update effect
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    }, []);

    // Optimized buffered regions update
    const updateBuffered = useCallback(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        const bufferedTimeRanges = [];

        for (let i = 0; i < video.buffered.length; i++) {
            bufferedTimeRanges.push({
                start: (video.buffered.start(i) / video.duration) * 100,
                end: (video.buffered.end(i) / video.duration) * 100
            });
        }

        setBuffered(bufferedTimeRanges);
    }, []);

    // Keyboard controls with debouncing
    useEffect(() => {
        let keyTimeout;

        const handleKeyPress = (e) => {
            if (keyTimeout) clearTimeout(keyTimeout);

            keyTimeout = setTimeout(() => {
                if (e.code === 'Space') {
                    e.preventDefault();
                    togglePlay();
                } else if (e.code === 'ArrowRight') {
                    skip(10);
                } else if (e.code === 'ArrowLeft') {
                    skip(-10);
                } else if (e.code === 'KeyF') {
                    toggleFullScreen();
                }
            }, 50);
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            if (keyTimeout) clearTimeout(keyTimeout);
        };
    }, []);

    // Video event listeners with cleanup
    useEffect(() => {
        const video = videoRef.current;

        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
        };

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('progress', updateBuffered);

        progressUpdateRef.current = requestAnimationFrame(updateProgress);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('progress', updateBuffered);
            if (progressUpdateRef.current) {
                cancelAnimationFrame(progressUpdateRef.current);
            }
        };
    }, [updateProgress, updateBuffered]);

    // Fullscreen change detection
    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
    }, []);

    const showOverlay = useCallback((action) => {
        setOverlay({ action, visible: true });
        setTimeout(() => {
            setOverlay(prev => ({ ...prev, visible: false }));
        }, 500);
    }, []);
    const togglePlay = useCallback(() => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            showOverlay('play');
        } else {
            videoRef.current.pause();
            showOverlay('pause');
        }
    }, [showOverlay]);


    const skip = useCallback((seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
            showOverlay(seconds > 0 ? 'forward' : 'backward');
        }
    }, [showOverlay]);

    const toggleFullScreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement) {
                await containerRef.current.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Error attempting to toggle full-screen:', err);
        }
    }, []);

    const handleProgressBarClick = useCallback((e) => {
        const rect = progressBarRef.current.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        videoRef.current.currentTime = pos * videoRef.current.duration;
    }, []);

    const handleVolumeChange = useCallback((newVolume) => {
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
            setIsMuted(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            const newMutedState = !isMuted;
            setIsMuted(newMutedState);
            videoRef.current.muted = newMutedState;
        }
    }, [isMuted]);

    // Add volume to video element effect
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.volume = volume;
            videoRef.current.muted = isMuted;
        }
    }, [volume, isMuted]);

    // capture if user uses this keyboard shortcut ctlr + shift + r / cmd + shift + r / ctrl + shift + s / windwos + shift + s / windows + shift + r / windwos + g
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'r' || e.key === 's' || e.key === 'g')) {
                setMaybeRecording(true);
            }
        };

        const handleKeyUp = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'r' || e.key === 's' || e.key === 'g')) {
                setMaybeRecording(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative aspect-video bg-black rounded-lg overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50' : 'w-full'}`}
        >
            <video
                onClick={togglePlay}
                ref={videoRef}
                className="w-full h-full object-contain"
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload"
                style={{
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    display: 'block',
                }}
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <ActionOverlay
                action={overlay.action}
                visible={overlay.visible}
            />

            <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${isFullScreen ? 'pb-8' : ''}`}>
                <ProgressBar
                    progress={progress}
                    buffered={buffered}
                    onSeek={handleProgressBarClick}
                    progressBarRef={progressBarRef}
                />

                <div className="flex justify-between items-center gap-4 mt-4">
                    <div className='flex items-center gap-4'>
                        <ControlButton
                            onClick={() => skip(-10)}
                            icon={TbRewindBackward10}
                            label="Rewind 10 seconds"
                        />
                        <ControlButton
                            onClick={togglePlay}
                            icon={isPlaying ? Pause : Play}
                            label={isPlaying ? 'Pause' : 'Play'}
                        />
                        <ControlButton
                            onClick={() => skip(10)}
                            icon={TbRewindForward10}
                            label="Forward 10 seconds"
                        />
                        <VolumeControl
                            volume={volume}
                            isMuted={isMuted}
                            onVolumeChange={handleVolumeChange}
                            onMuteToggle={toggleMute}
                        />
                        <TimeDisplay
                            currentTime={currentTime}
                            duration={duration}
                        />
                    </div>
                    <ControlButton
                        onClick={toggleFullScreen}
                        icon={Maximize}
                        label="Toggle fullscreen"
                        className="ml-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;