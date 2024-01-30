import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center px-[4rem] my-5">
      <img src={logo} alt="logo" className="h-[4rem]" />
      <button
        onClick={() => navigate(props.login ? "/login" : "/signup")}
        className="py-[0.5rem] px-[1rem] bg-[#e50914] cursor-pointer rounded-[0.2rem] font-bolder text-[1.05rem]"
      >
        {props.login ? "Log In" : "Sign Up"}
      </button>
    </div>
  );
};

export default Header;
