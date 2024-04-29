import Image from "next/image";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white font-bold flex gap-2 justify-center px-4 items-center h-16">
      A Vercel &copy; Deploy
    </footer>
  );
};

export default Footer;
