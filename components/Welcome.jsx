import { EnhancedEncryption } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import React from "react";
import Footer from "./Footer";

const Welcome = () => {
  return (
    <div className="">
      <div className="max-w-screen-lg flex mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between px-5 py-10 md:p-20">
          <div className="space-y-5 md:w-1/2">
            <h1 className="text-4xl mb-5">
              Simple. Secure. Reliable messaging.
            </h1>
            <p className="text-gray-700">
              With WhatsApp, you will get fast, simple, secure messaging and
              calling for free*, available on phones all over the world.
            </p>
            <p className="text-gray-500">
              * Data charges may apply. Contact your provider for details.
            </p>
            <button
              onClick={signIn}
              className="bg-[#128c7e] px-4 py-2 text-white rounded-sm hover:bg-[#1fc4b1] transition ease-out"
            >
              Get Started Now
            </button>
          </div>
          <img
            className="hidden md:inline-flex w-1/4 object-contain"
            src="welcome1.png"
            alt="welcome1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-5 gap-y-5 md:gap-y-0">
        <div className="bg-[#D8E8EA] space-y-10 px-5 md:px-20 pt-5 md:pt-20 flex flex-col text-center items-center md:m-5">
          <h1 className="font-bold text-3xl">WhatsApp Business App</h1>
          <p>
            WhatsApp Business is a free to download app that was built with the
            small business owner in mind. Create a catalog to showcase your
            products and services. Connect with your customers easily by using
            tools to automate, sort and quickly respond to messages.
          </p>
          <p>
            WhatsApp can also help medium and large businesses provide customer
            support and deliver important notifications to customers. Learn more
            about WhatsApp Business API.
          </p>
          <img
            className="md:w-1/2 pt-5 md:pt-10"
            src="welcome2.png"
            alt="welcome2"
          />
        </div>

        <div className="bg-[#E7F0E4] space-y-10 p-5 md:p-20 flex flex-col text-center items-center md:m-5">
          <EnhancedEncryption className="text-[6rem] md:text-[12rem] bg-[#77D7C8] rounded-full text-white p-5 md:p-14" />
          <h3 className="font-bold text-xl text-gray-500">
            END-TO-END ENCRYPTION
          </h3>
          <h1 className="font-bold text-3xl">Security by Default</h1>
          <p>
            Some of your most personal moments are shared on WhatsApp, which is
            why we built end-to-end encryption into the latest versions of our
            app. When end-to-end encrypted, your messages and calls are secured
            so only you and the person you are communicating with can read or
            listen to them, and nobody in between, not even WhatsApp.
          </p>
        </div>
      </div>

      <div className="flex justify-center py-10">
        <button
          className="text-[#128C7E] border border-[#128C7E] rounded-full 
      px-4 py-2 text-lg hover:text-white hover:bg-[#128C7E] transition ease-out"
        >
          Explore Features
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Welcome;
