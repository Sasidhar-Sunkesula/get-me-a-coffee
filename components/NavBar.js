"use client";

import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";

const NavBar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);

  return (
    <nav className="bg-black text-white flex justify-between gap-4 px-4 items-center md:h-16 flex-col md:flex-row">
      <Link
        href={"/"}
        className="logo font-bold text-lg flex justify-center items-center"
      >
       <span className="text-2xl md:text-base my-3 md:my-0">GetMeACoffee!</span> 
      </Link>
      <div className="relative flex flex-col gap-4 md:block" onMouseLeave={() => setshowdropdown(false)}>
        {session && (
          <>
            <button
              onClick={() => setshowdropdown(!showdropdown)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } absolute left-[125px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href={"/dashboard"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    onClick={() => signOut()}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <button
            className="text-white bg-gradient-to-br from-purple-600
  to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
  focus:ring-blue-300  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5
py-2.5 text-center me-2 mb-2"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}
        {!session && (
          <Link href={"/login"}>
            <button
              className=" text-white bg-gradient-to-br from-purple-600 to-blue-500
hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300
  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Log in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
