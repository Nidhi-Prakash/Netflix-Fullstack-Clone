import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";

const Player = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full h-full">
        <div className="absolute p-[2rem] z-10">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video
          src={video}
          autoPlay
          loop
          controls
          muted
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Player;
