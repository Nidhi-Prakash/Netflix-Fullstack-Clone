import React from "react";
import background from "../assets/Login2.jpg";

const BackgroundImage = () => {
  return (
    <div className="h-[100vh] w-[100vw]">
      <img className="h-[100vh] w-[100vw]" src={background} alt="background" />
    </div>
  );
}

export default BackgroundImage;