import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Feed from "../components/Feed";
import TVShows from "./TVShows";
import UserListedMovies from "./UserListedMovies";
import MoviePage from "./Movies";

function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pathName = (location?.pathname ?? "").substring(1);

  const isFeedPage = () => {
    return pathName === "";
  };

  const isTvPage = () => {
    return pathName?.toLowerCase() === "tv";
  };

  const isMyListPage = () => {
    return pathName?.toLowerCase() === "mylist";
  };

  const isMoviesPage = () => {
    return pathName?.toLowerCase() === "movies";
  };

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
        {isFeedPage() && <Feed />}
        {isTvPage() && <TVShows />}
        {isMyListPage() && <UserListedMovies />}
        {isMoviesPage() && <MoviePage />}
      </div>
    </>
  );
}
export default HomePage;