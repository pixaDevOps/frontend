import React, { useState, useEffect } from "react";
import logo from "../../assets/icons/logo.svg";
import PhoneIcon from "../../assets/icons/Phone.svg";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [step, setStep] = useState("phone"); // 'phone' | 'otp'
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const navigate = useNavigate();

  // Start countdown when OTP step begins
  useEffect(() => {
    let interval;
    if (step === "otp") {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendVisible(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimer(30);
    setResendVisible(false);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-white ">
      <img src={logo} alt="Ayushya Mandalam Logo" className="w-36 h-36 mb-4" />

      {step === "phone" && (
        <>
          <h2 className="text-2xl font-bold mb-1 text-gray-800">Login</h2>
          <p className="text-gray-800 text-sm mb-6 text-center">
            Hello, Enter your details to get login <br /> to your account
          </p>
          <div className="w-full max-w-xs">
            <div className="relative mb-4">
              <img
                src={PhoneIcon}
                alt="Phone Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="tel"
                placeholder="Enter your Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none"
              />
            </div>
            <button
              onClick={() => setStep("otp")}
              className="w-full bg-secondary text-white font-semibold py-3 px-4 rounded-md transition duration-200"
            >
              Send OTP
            </button>
          </div>
        </>
      )}

      {step === "otp" && (
        <>
          <h2 className="text-xl font-bold mb-2 text-gray-800">OTP verification</h2>
          <p className="text-gray-600 mb-4 text-sm text-center">
            Enter OTP code sent to <br />
            <span className="font-semibold text-black ">+91 {phone || "9878987678"}</span>
          </p>

          <div className="flex space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          {!resendVisible ? (
            <p className="text-sm text-gray-600 mb-2 text-center">
              Didn’t receive OTP code? <br /> <span className="font-medium text-secondary">{timer}s ⏱</span>
            </p>
          ) : (
            <p className="text-sm text-gray-800 mb-2 text-center">
              Didn’t receive OTP code?{" "} <br />
              <button onClick={handleResend} className="underline font-medium text-secondary">
                Resend OTP
              </button>
            </p>
          )}

          <button
      onClick={() => navigate("/dashboard")}
      className="w-full max-w-xs bg-secondary text-white font-semibold py-3 px-4 rounded-md transition duration-200 mt-2"
    >
      Login
    </button>
        </>
      )}
    </div>
  );
};

export default LoginForm;
