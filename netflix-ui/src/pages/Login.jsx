import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [isValidEmailId, setIsValidEmailId] = useState(true);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === "" || password === "") {
      if (email === "") {
        setShowEmailError(true);
      }
      if (password === "") {
        setShowPasswordError(true);
      }
      return;
    }
    if (!emailRegex.test(email)) {
      setIsValidEmailId(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setInvalidCredentials(true);
      setPassword("");
      setEmail("");
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div>
      <BackgroundImage />
      <div className="bg-[#00000080] w-full h-full absolute top-0 left-0">
        <Header />
        <div className="flex flex-col justify-center items-center w-[25vw] p-[1rem] mx-auto bg-[#000000b0] px-[30px] mt-[16rem]">
          <div className="flex justify-center items-center flex-col">
            <h3 className="py-[10px] font-medium">Login</h3>
            {invalidCredentials && (
              <div className="text-md font-normal text-red-700 flex justify-start items-center">
                Invalid Credentials
              </div>
            )}
          </div>
          <div className="flex justify-center items-center flex-col gap-[2rem] w-full py-[0.5rem]">
            <div className="w-full">
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setShowEmailError(false);
                  setInvalidCredentials(false);
                  setIsValidEmailId(true);
                }}
                value={email}
                className="p-[0.5rem] text-black border-none focus:outline-none w-full"
              />
              {showEmailError && (
                <div className="text-md font-normal text-red-700 flex justify-start items-center">
                  Pls provide an Email Id.
                </div>
              )}
              {!isValidEmailId && (
                <div className="text-md font-normal text-red-700 flex justify-start items-center">
                  Pls provide a valid Email Id.
                </div>
              )}
            </div>
            <div className="w-full">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowPasswordError(false);
                  setInvalidCredentials(false);
                }}
                value={password}
                className="p-[0.5rem] text-black border-none focus:outline-none w-full"
                required
              />
              {showPasswordError && (
                <div className="text-md font-normal text-red-700 flex justify-start items-center">
                  Pls provide an Password.
                </div>
              )}
            </div>

            <button
              onClick={handleLogin}
              className={`py-[0.5rem] px-[1rem] rounded-[0.2rem] font-bolder text-[1.05rem] ${
                showEmailError ||
                showPasswordError ||
                invalidCredentials ||
                !isValidEmailId
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#e50914] cursor-pointer"
              }`}
              disabled={
                showEmailError ||
                showPasswordError ||
                invalidCredentials ||
                !isValidEmailId
              }
            >
              Login to your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
