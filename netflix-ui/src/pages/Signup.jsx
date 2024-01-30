import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from "../utils/firebase-config";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [isValidEmailId, setIsValidEmailId] = useState(true);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const { email, password } = formValues;
    if (
      email === "" ||
      password === "" ||
      !emailRegex.test(email) ||
      !passwordRegex.test(password)
    ) {
      if (email === "") {
        setShowEmailError(true);
      }
      if (password === "") {
        setShowPasswordError(true);
      }
      if (!emailRegex.test(email)) {
        setIsValidEmailId(false);
      }
      if (!passwordRegex.test(password)) {
        setIsValidPassword(false);
      }
      return;
    }
    try {
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setFormValues({
        email: "",
        password: "",
      });
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  return (
    <div showPassword={showPassword}>
      <BackgroundImage />
      <div className="bg-[#00000080] w-full h-full absolute top-0 left-0">
        <Header login />
        <div className="flex justify-center items-center flex-col mt-[20rem] bg-[#000000b0] w-[50vw] mx-auto py-[15px] gap-5">
          <div className="flex justify-center items-center flex-col text-[24px] gap-3">
            <h1>Unlimited movies, TV shows and more.</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership.
            </h6>
          </div>
          <div className="flex justify-center items-center w-[46vw]">
            <div className="w-full border border-red-700">
              <input
                type="email"
                placeholder="Email address"
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  });
                  setShowEmailError(false);
                  setIsValidEmailId(true);
                }}
                name="email"
                value={formValues.email}
                className="w-full p-[1.2rem] text-black border-none focus:outline-none "
              />
              {showEmailError && (
                <div className="text-md font-normal text-red-700 flex justify-start items-center">
                  Pls provide an Email Id.
                </div>
              )}
              {!showEmailError && !isValidEmailId && (
                <div className="text-md font-normal text-red-700 flex justify-start items-center">
                  Pls provide a valid Email Id.
                </div>
              )}
            </div>
            {showPassword && (
              <div className="w-full border">
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        [e.target.name]: e.target.value,
                      });
                      setShowPasswordError(false);
                      setIsValidPassword(true);
                    }}
                    name="password"
                    value={formValues.password}
                    className="w-full p-[1.2rem] text-black border-none focus:outline-none ml-2 "
                  />
                </div>
                {showPasswordError && (
                  <div className="pl-[7px] text-md font-normal text-red-700 flex justify-start items-center">
                    Pls provide an Password.
                  </div>
                )}
                {!showPasswordError && !isValidPassword && (
                  <div className="pl-[7px] text-md font-normal text-red-700 flex justify-start items-center">
                    Pls provide a valid Password.
                  </div>
                )}
              </div>
            )}
            {!showPassword && (
              <button
                onClick={() => setShowPassword(true)}
                className={`w-[15rem] p-[1.2rem] ${
                  formValues.email === "" || !emailRegex.test(formValues.email)
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#e50914] "
                }`}
                disabled={
                  formValues.email === "" || !emailRegex.test(formValues.email)
                }
              >
                Get Started
              </button>
            )}
          </div>
          {showPassword && (
            <button
              onClick={handleSignIn}
              className="bg-[#e50914] py-[0.8rem] px-[1rem] rounded-[0.2rem] mt-[10px]"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
