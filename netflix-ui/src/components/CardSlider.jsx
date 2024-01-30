import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Card from "./Card";

export default React.memo(function CardSlider({ data, title }) {
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  return (
    <div
      className="flex-col gap-[1rem] relative py-[2rem]"
      showControls={showControls}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="ml-[50px]">{title}</h1>
      <div className="wrapper">
        <div
          className={`cursor-pointer absolute z-[99] h-full top-0 bottom-0 w-[50px] transition-transform duration-300 ease-in-out left-0 ${
            !showControls ? "hidden" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft
            className="text-[2rem]"
            onClick={() => handleDirection("left")}
          />
        </div>
        <div
          className="flex gap-[1rem] ml-[50px] w-max translate-x-0 transition-transform duration-300 ease-in-out"
          ref={listRef}
        >
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`cursor-pointer absolute z-[99] h-full top-0 bottom-0 w-[50px] transition-transform duration-300 ease-in-out right-0 ${
            !showControls ? "hidden" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight
            className="text-[2rem]"
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
});
