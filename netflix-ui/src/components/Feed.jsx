import React from "react";
import MovieLogo from "../assets/homeTitle.webp";
import backgroundImage from "../assets/home.jpg";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import FaqList from "../pages/FaqList";
import { useSelector } from "react-redux";
import Slider from "./Slider";

const Feed = () => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);

  return (
    <>
      <div className="relative">
        <img
          src={backgroundImage}
          alt="background"
          className="brightness-[60%] h-full w-full"
        />
        <div className="absolute bottom-[5rem]">
          <div className="logo">
            <img
              src={MovieLogo}
              alt="Movie Logo"
              className="h-full w-full ml-[5rem]"
            />
          </div>
          <div className="m-[5rem] gap-[2rem] flex">
            <button
              onClick={() => navigate("/player")}
              className="flex justify-center items-center text-[1.4rem] gap-[1rem] rounded-[0.2rem] p-[0.5rem] pl-[2rem] pr-[2.4rem] border-none cursor-pointer transition-all duration-200 ease-in-out hover:opaccity-[0.8] bg-[#6d6d6eb3]"
            >
              <FaPlay />
              Play
            </button>
            <button className="flex justify-center items-center text-[1.4rem] gap-[1rem] rounded-[0.2rem] p-[0.5rem] pl-[2rem] pr-[2.4rem] border-none cursor-pointer transition-all duration-200 ease-in-out hover:opaccity-[0.8] bg-[#6d6d6eb3]">
              <AiOutlineInfoCircle />
              More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
      <div className="w-full h-[0.5rem] bg-[#232323] mt-[4.5rem]"></div>
      <FaqList />
    </>
  );
};

export default Feed;
