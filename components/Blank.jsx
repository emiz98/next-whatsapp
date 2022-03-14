import { Laptop } from "@mui/icons-material";
import React from "react";

const Blank = () => {
  return (
    <div className="flex flex-col items-center flex-1 justify-center h-screen bg-[#222E35]">
      <div className="space-y-5 text-gray-500 flex flex-col items-center flex-1 justify-center h-screen">
        <img className="w-64 object-contain" src="/blank.jpg" alt="" />
        <h3 className="text-white text-3xl">Keep your phone connected</h3>
        <p className="w-4/5 md:w-2/5 flex justify-center text-center">
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </p>
        <div className="h-1 border-b border-gray-700 w-3/5 md:w-2/5"></div>
        <div className="flex items-center space-x-3">
          <Laptop />
          <div className="text-sm md:text-base">
            Make calls from desktop with WhatsApp for Windows.
            <span className="text-[#00A870] cursor-pointer"> Get it here.</span>
          </div>
        </div>
      </div>
      <div className="h-2 bg-[#008069] w-full"></div>
    </div>
  );
};

export default Blank;
