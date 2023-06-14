import React from "react";
const Footer = ({ isLanding }) => {
  if (!isLanding) {
    return (
      <div className="bg-slate-400">
        <div className=" max-w-screen-xl mx-auto flex justify-between items-end">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="/" className="hover:underline">
                FishShield
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="relative text-white bg-gray-50">
        <div className="absolute inset-0 bottom-10 max-w-screen-xl mx-auto flex justify-between items-end">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="/" className="hover:underline">
                FishShield
              </a>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-gray-400 sm:mt-0">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 265">
            <path
              fill="#1c4d84"
              fillOpacity="0.9"
              d="M0,192L40,181.3C80,171,160,149,240,128C320,107,400,85,480,96C560,107,640,149,720,149.3C800,149,880,107,960,74.7C1040,43,1120,21,1200,37.3C1280,53,1360,107,1400,133.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    );
};

export default Footer;
