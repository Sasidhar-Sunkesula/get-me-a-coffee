import PaymentPage from "@/components/PaymentPage";
import React from "react";
import { notFound } from "next/navigation";
import connectDB from "@/db.js/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
  // If the user is not present in the database, show a 404 page
  const checkUser = async () => {
    await connectDB();
    let u = await User.findOne({ username: params.username });
    console.log("userhy", u);
    if (!u) {
      return notFound();
    }
  }
  await checkUser();
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} · - Get Me A Coffee`,
  }
}
