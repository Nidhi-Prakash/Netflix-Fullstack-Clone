import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Slider from "../components/Slider";
import FaqList from "./FaqList";
function Netflix() {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <>
      <div className="bg-black">
        <Navbar isScrolled={isScrolled} />
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
              <button className="flex justify-center items-center bg-[#6d6d6eb3] text-[#ffffff]">
                <AiOutlineInfoCircle />
                More Info
              </button>
            </div>
          </div>
        </div>
        <Slider movies={movies} />
        <div className="w-full h-[0.5rem] bg-[#232323] mt-[4.5rem]"></div>
        <FaqList />
      </div>
    </>
  );
}

export default Netflix;
