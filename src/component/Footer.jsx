import React, { useEffect } from "react";

function Footer() {
  return (
    <footer className="bg-[#fff]">
      <div className="mx-auto w-full p-4 py-6 lg:py-8 px-10 reveal fade-right">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="/" className="hover:underline">
              BoldSwitch Sample™
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="#" className="hover:underline">
                Terms & Condition
              </a>
            </span>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              |
            </span>
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
