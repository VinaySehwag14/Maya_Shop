import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useState } from "react";
import { sliderItems } from "../data";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  return (
    <div className="w-full h-screen sm:flex relative overflow-hidden hidden ">
      {/* arrow */}
      <div
        onClick={() => handleClick("left")}
        className="w-[50px] h-[50px] bg-gray-100 rounded-full flex items-center justify-center
        absolute top-0 bottom-0 m-auto left-[10px] cursor-pointer opacity-[0.5] z-[2] "
      >
        <ArrowLeftOutlinedIcon />
      </div>
      {/* wrapper */}
      <div
        style={{ transform: `translateX(${slideIndex * -100}vw)` }}
        className="h-full flex transition duration-[1.5s] "
      >
        {/* slides */}
        {sliderItems.map((i) => (
          <div
            key={i.id}
            style={{ backgroundColor: `#${i.bg}` }}
            className="flex items-center w-screen h-screen "
          >
            <div className="flex-1 h-full relative " id="imgc">
              <img
                layout="fill"
                objectFit="contain"
                src={i.img}
                className="h-[80%]"
                alt="sliderimg"
              />
            </div>
            <div className="flex-1 p-[50px] " id="infoc">
              <h1 className="text-[70px] font-semibold ">{i.title}</h1>
              <p className="my-[50px] text-[20px] font-medium tracking-[3px] ">
                {i.desc}
              </p>
              <button
                className="p-[10px] text-[14px] bg-transparent cursor-pointer border-2 
              border-gray-800 "
              >
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        onClick={() => handleClick("right")}
        className="w-[50px] h-[50px] bg-gray-100 rounded-full flex items-center justify-center
        absolute top-0 bottom-0 m-auto right-[10px] cursor-pointer opacity-[0.5] z-[2] "
      >
        <ArrowRightOutlinedIcon />
      </div>
    </div>
  );
};

export default Slider;
