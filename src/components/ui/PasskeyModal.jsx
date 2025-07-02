import React, { useRef } from "react";
import BusinessmanImage from "../../assets/images/Man.png";
import LockIcon from '../../assets/icons/PassKey.svg';

const PasskeyModal = ({ passkey, setPasskey, onSubmit, onClose }) => {
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value;
    if (!/^[0-9]*$/.test(val)) return;
    const updated = [...passkey];
    updated[idx] = val;
    setPasskey(updated);
    if (val && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !passkey[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-2xl p-6 relative border border-gray-200 dark:border-gray-700 flex">

        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>

        {/* 👔 Left Side Image */}
        <img
          src={BusinessmanImage}
          className="w-1/2 object-contain"
          alt="Businessman"
        />

        {/* 🔐 Right Side Panel */}
        <div className="w-1/2 px-6 flex flex-col justify-center items-center">
          <img src={LockIcon} alt="Lock Icon" className="w-12 h-12 mb-2" />
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800 dark:text-white">
            Passkey
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-10 text-center">
            Please Enter Your Passkey
          </p>

          {/* 🔢 Passkey Inputs */}
          <div className="flex justify-center gap-3 mb-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="password"
                maxLength={1}
                className="w-12 h-12 text-lg text-center rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={passkey[idx] || ""}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              />
            ))}
          </div>

          {/* ✅ Done Button */}
          <button
            onClick={onSubmit}
            className="w-4/5 bg-secondary hover:bg-secondary/90 text-white rounded py-2 text-lg font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasskeyModal;
