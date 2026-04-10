import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stories } from "../../utils/constants";
import StoryViewer from "./StoryViewer";

const StoriesContainer = () => {
    const [openViewer, setOpenViewer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const handleOpenViewer = (index) => {
        setCurrentIndex(index);
        setOpenViewer(true);
    };

    const handleCloseViewer = () => {
        setOpenViewer(false);
        setCurrentIndex(0);
    };

    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-xl px-6 py-4 mb-6">
                <Slider {...settings}>
                    {stories.map((s, i) => (
                        <div key={i} className="px-3">
                            <button
                                type="button"
                                onClick={() => handleOpenViewer(i)}
                                className="flex flex-col items-center justify-center w-full bg-transparent border-0 cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
                                    <img
                                        className="w-full h-full rounded-full object-cover border-2 border-white"
                                        src={require(`../../assests/images/logos/${s.image}.webp`)}
                                        alt={s.title}
                                        draggable="false"
                                    />
                                </div>

                                <span className="text-xs mt-2 text-gray-700 text-center truncate w-[78px]">
                                    {s.title}
                                </span>
                            </button>
                        </div>
                    ))}
                </Slider>
            </div>

            {openViewer && (
                <StoryViewer
                    stories={stories}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    onClose={handleCloseViewer}
                />
            )}
        </>
    );
};

export default StoriesContainer;