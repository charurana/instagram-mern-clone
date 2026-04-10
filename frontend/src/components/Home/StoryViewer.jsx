import React, { useEffect, useState } from "react";

const StoryViewer = ({ stories, currentIndex, setCurrentIndex, onClose }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(0);

        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 4));
        }, 100);

        const timer = setTimeout(() => {
            if (currentIndex < stories.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                onClose();
            }
        }, 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [currentIndex]);

    const currentStory = stories[currentIndex];

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center">

            {/* MAIN STORY BOX */}
            <div className="relative w-[360px] h-[640px] bg-black rounded-2xl overflow-hidden shadow-2xl">

                {/* PROGRESS BARS */}
                <div className="absolute top-0 left-0 right-0 z-20 px-2 pt-2 flex gap-[2px]">
                    {stories.map((_, i) => (
                        <div key={i} className="flex-1 h-1 bg-white/30 rounded overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100"
                                style={{
                                    width:
                                        i < currentIndex
                                            ? "100%"
                                            : i === currentIndex
                                            ? `${progress}%`
                                            : "0%",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* HEADER */}
                <div className="absolute top-5 left-0 right-0 z-20 flex items-center justify-between px-4">

                    <div className="flex items-center gap-3 mt-3">
                        <img
                            src={require(`../../assests/images/logos/${currentStory.image}.webp`)}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover border border-white"
                        />
                        <span className="text-white text-sm font-medium">
                            {currentStory.title}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-white text-3xl hover:opacity-70"
                    >
                        ×
                    </button>
                </div>

                {/* CLICK AREAS */}
                <div
                    onClick={handlePrev}
                    className="absolute left-0 top-0 h-full w-1/3 z-10 cursor-pointer"
                />
                <div
                    onClick={handleNext}
                    className="absolute right-0 top-0 h-full w-1/3 z-10 cursor-pointer"
                />

                {/* STORY IMAGE (FINAL FIX) */}
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <img
                        src={require(`../../assests/images/logos/${currentStory.image}.webp`)}
                        alt=""
                        className="w-full h-full object-cover"
                        draggable="false"
                    />
                </div>

                {/* BOTTOM TEXT */}
                <div className="absolute bottom-6 left-0 right-0 text-center z-20">
                    <span className="text-white text-sm bg-black/40 px-4 py-2 rounded-full">
                        {currentStory.title}
                    </span>
                </div>

            </div>
        </div>
    );
};

export default StoryViewer;