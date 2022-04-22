import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="text-white bg-[#273443] p-10">
        <div className="max-w-screen-lg space-y-10 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-10 md:space-y-0">
            <div className="footerCol flex flex-col">
              <h4 className="text-xl font-medium">WHATSAPP</h4>
              <span>Features</span>
              <span>Security</span>
              <span>Download</span>
              <span>WhatsApp Web</span>
              <span>Business</span>
              <span>Privacy</span>
            </div>

            <div className="footerCol flex flex-col">
              <h4 className="font-medium">COMPANY</h4>
              <span>About</span>
              <span>Careers</span>
              <span>Brand Center</span>
              <span>Get in touch</span>
              <span>Blog</span>
              <span>WhatsApp Stories</span>
            </div>

            <div className="footerCol flex flex-col">
              <h4 className="text-xl font-medium">DOWNLOAD</h4>
              <span>Mac/PC</span>
              <span>Android</span>
              <span>iPhone</span>
            </div>

            <div className="footerCol flex flex-col">
              <h4 className="text-xl font-medium">HELP</h4>
              <span>Help Center</span>
              <span>Twitter</span>
              <span>Facebook</span>
              <span>Coronavirus</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-white bg-gray-900 p-5">
        <div className="max-w-screen-lg space-y-10 mx-auto">
          <div className="flex items-center justify-between">
            <span>This build is only for educational purposes only.</span>
            <span className="hidden md:inline-flex">Privacy and Terms</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
