import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#322975] pt-8">
      <div className="container mx-auto px-4">
        <div className="border-b border-white border-opacity-15 pb-8">
          <div className="flex flex-wrap ">
            {/* Quick Links */}
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
              <h1 className="text-2xl text-[#fdc800] font-bold mb-8">
                Quick Links
              </h1>
              <div className="flex gap-10">
                <div>
                  <div className="mb-3">
                    <a
                      href="#home"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      Home
                    </a>
                  </div>
                  <div className="mb-3">
                    <a
                      href="#about"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      About Us
                    </a>
                  </div>
                  <div className="mb-3">
                    <a
                      href="#industries"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      Industries
                    </a>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <a
                      href="#institutes"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      Institutions
                    </a>
                  </div>
                  <div className="mb-3">
                    <a
                      href="#openings"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      Openings
                    </a>
                  </div>
                  <div className="mb-3">
                    <a
                      href="#consultancies"
                      className="text-sm text-white opacity-66 hover:opacity-100 transition-opacity"
                    >
                      Consultancies
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
              <h1 className="text-2xl text-[#fdc800] font-bold mb-8">
                Contact Us
              </h1>
              <div className="mb-3">
                <span className="text-[#fdc800]">📞</span>
                <span className="text-sm text-white opacity-66 ml-2">
                  +91-1145771000
                </span>
              </div>
              <div className="mb-3">
                <span className="text-[#fdc800]">📧</span>
                <span className="text-sm text-white opacity-66 ml-2">
                  info@cii.in
                </span>
              </div>
              <div className="mb-3">
                <span className="text-[#fdc800]">📍</span>
                <span className="text-sm text-white opacity-66 ml-2">
                  23, Institutional Area, Lodi Road, New Delhi - 110 003 (India)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-4 relative">
          <div className="text-center text-[#949494]">
            <span>
              <a href="#">Copyright 2022 CII | All Rights Reserved</a>
            </span>
          </div>
          <div className="w-14 h-14 bg-[#fdc800] rounded-full absolute bottom-2 right-2 flex justify-center items-center">
            <a href="#" className="text-black text-2xl">
              ▲
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
