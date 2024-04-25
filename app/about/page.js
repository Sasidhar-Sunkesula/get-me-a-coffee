import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="p-6 rounded-lg md:px-4 px-8 shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-blue-700">
        About Our Platform
      </h1>
      <p className="text-lg mb-4 p-4 rounded-lg shadow-inner border border-blue-200">
        Our platform is a community-driven space designed to empower creators
        and their supporters. We believe in the power of community and the
        importance of creative freedom. Our mission is to provide a platform
        where creators can share their work, connect with their audience, and
        receive the support they need to continue doing what they love.
      </p>
      <p className="text-lg mb-4 p-4 rounded-lg shadow-inner border border-blue-200">
        We are committed to fostering a diverse and inclusive community where
        everyone feels welcome. We believe that everyone has a story to tell,
        and we want to provide the tools and resources necessary for these
        stories to be heard.
      </p>
      <p className="text-lg p-4 rounded-lg shadow-inner border border-blue-200">
        Whether you&apos;re a creator looking to share your work or a supporter
        looking to help your favorite creators, we&apos;re here to help. Thank
        you for being a part of our community.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Support Us</h2>
        <p className="text-lg mb-4 p-4 rounded-lg shadow-inner border border-blue-200">
          If you enjoy our platform and would like to support us, consider
          becoming a member. By becoming a member, you&apos;ll gain access to
          exclusive content, early access to new features, and the satisfaction
          of knowing that you&apos;re helping to support the creators you love.
        </p>
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Become a member
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About - Get Me A Coffee",
}
