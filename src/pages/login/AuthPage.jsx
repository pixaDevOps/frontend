import React from "react";
import SuccessCarousel from "../../components/ui/Carousel";
import LoginForm from "./LoginForm";
import bgPattern from "../../assets/images/LoginBackground.png"; // background image

const AuthPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgPattern})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-3xl  w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Carousel */}
        <div className="w-full lg:w-1/2 bg-white">
          <SuccessCarousel />
        </div>

        {/* Right: Login */}
        <div className="w-full lg:w-1/2">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
