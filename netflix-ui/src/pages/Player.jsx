import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

const Player = () => {
  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

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
