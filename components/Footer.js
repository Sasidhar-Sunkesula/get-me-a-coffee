import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white flex justify-center px-4 items-center h-16">
      <p className="text-center">
        Copyright &copy; Get me a Coffee - {currentYear} - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
