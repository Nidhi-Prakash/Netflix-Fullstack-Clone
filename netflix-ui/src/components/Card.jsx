import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
// import video from "../assets/video.mp4";

export default React.memo(function Card({ index, movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-[230px] cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <div className="w-[20rem] absolute z-10 bottom-0 b-[0.3rem] bg-[#181818] bg-opacity-95 transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="relative h-[140px]">
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/w500${movieData?.image}`}
              alt="card"
              onClick={() => navigate("/player")}
            />
          </div>
          <div className="p-[1rem] gap-[0.5rem] flex-col">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-[1rem] text-[2rem] cursor-pointer">
                <IoPlayCircleSharp
                  className="hover:text-[#b8b8b8]"
                  title="Play"
                  onClick={() => navigate("/player")}
                />
                {isLiked ? (
                  <BsCheck
                    className="hover:text-[#b8b8b8]"
                    title="Remove from List"
                    onClick={() =>
                      dispatch(
                        removeMovieFromLiked({ movieId: movieData.id, email })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus
                    className="hover:text-[#b8b8b8]"
                    title="Add to my list"
                    onClick={addToList}
                  />
                )}
              </div>
            </div>
            <div className="flex">
              <ul className="flex list-none gap-4">
                {movieData.genres.map((genre) => (
                  <li className="pr-[0.7rem]">{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <img
          className="z-10 rounded-md"
          src={`https://image.tmdb.org/t/p/w500${movieData?.image}`}
          alt="card"
          onClick={() => navigate("/player")}
        />
      )}
    </div>
  );
});
