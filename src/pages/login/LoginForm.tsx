import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import PhoneIcon from "../../assets/icons/Phone.svg";
import logo from "../../assets/icons/logo.svg";

//  validation 
const phoneSchema = z.object({
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
});

type PhoneInput = z.infer<typeof phoneSchema>;

const LoginForm = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [resendVisible, setResendVisible] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PhoneInput>({ resolver: zodResolver(phoneSchema) });

  //  OTP Countdown Timer
  useEffect(() => {
    if (step === "otp") {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendVisible(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step]);

  //  Submit phone and move to OTP step
  const handlePhoneSubmit = (data: PhoneInput) => {
    console.log("Sending OTP to:", data.phone);
    setStep("otp");
  };

  //  Handle OTP input field
  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const next = document.getElementById(`otp-${index + 1}`);
        next?.focus();
      }
    }
  };

  //  Resend OTP handler
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    setResendVisible(false);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center bg-white">
      {/* LOGO */}
      <img src={logo} alt="Ayushya Mandalam" className="w-24 h-24 mb-6 object-contain" />

      {/* PHONE STEP */}
      {step === "phone" && (
        <form
          onSubmit={handleSubmit(handlePhoneSubmit)}
          className="w-full max-w-xs space-y-5"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary">Login</h2>
            <p className="text-sm text-placeholdergray mt-1">
              Enter your phone number to sign in
            </p>
          </div>

          <div className="relative">
            <img
              src={PhoneIcon}
              alt=""
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
            />
            <input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
              maxLength={10}
              className="w-full pl-10 pr-4 py-3 border border-bordergray rounded-lg outline-none focus:ring-2 focus:ring-secondary text-primary placeholder-placeholdergray"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-secondary text-white font-semibold py-3 px-4 rounded-md hover:bg-secondary/90 transition"
          >
            Send OTP
          </button>
        </form>
      )}

      {/*  OTP STEP */}
      {step === "otp" && (
        <div className="w-full max-w-xs space-y-5 text-center">
          <div>
            <h2 className="text-xl font-bold text-primary">OTP Verification</h2>
            <p className="text-sm text-placeholdergray mt-1">
              Code sent to
              <br />
              <span className="font-medium text-primary">+91 {watch("phone")}</span>
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-xl text-center border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-secondary text-primary"
                aria-label={`OTP digit ${index + 1}`}
              />
            ))}
          </div>

          {!resendVisible ? (
            <p className="text-sm text-placeholdergray">
              Didn't receive OTP?{" "}
              <span className="text-secondary font-medium">{timer}s ⏱</span>
            </p>
          ) : (
            <p className="text-sm text-primary">
              Didn't receive OTP?{" "}
              <button
                onClick={handleResend}
                className="underline text-secondary font-medium"
              >
                Resend
              </button>
            </p>
          )}

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-secondary text-white font-semibold py-3 px-4 rounded-md hover:bg-secondary/90 transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
