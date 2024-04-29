"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import { fetchpayments, fetchuser, initiate } from "@/actions/userActions";
import { useSearchParams } from "next/navigation";
import { Bounce } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  console.log("username", username);
  // const { data: session } = useSession();
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  const [currentUser, setCurrentUser] = useState();
  const [payments, setPayments] = useState([]);
  const SearchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (SearchParams.get("paymentdone") == "true") {
      toast("Payment Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    router.push(`${username}`);
  }, []);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const getData = async () => {
    const u = await fetchuser(username);
    console.log("meeee", u);
    setCurrentUser(u);

    let dbPayments = await fetchpayments(username);

    setPayments(dbPayments);
  };

  // Get the order Id
  const pay = async (amount) => {
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Get Me A Coffee", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  if (!currentUser) return <div>Loading...</div>;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Script
        id="razorpay-script"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>
      {console.log("db payments", payments)}
      <div className="object-cover w-full relative">
        <Image
          className="object-cover w-full h-48 md:h-[350]"
          src={currentUser.coverpic}
          alt="Avatar"
          width={350}
          height={350}
        />
        <div className="absolute -bottom-20 overflow-hidden md:right-[45%] right-[38%] rounded-full size-36 border-2 border-white">
          <Image
            className="rounded-full size-36 object-cover"
            src={currentUser.profilepic}
            alt="Avatar"
            width={128}
            height={128}
          />
        </div>
      </div>
      <div className="info flex justify-center items-center my-24 flex-col gap-2">
        <div className="font-bold text-lg">@{username}</div>
        <div className="text-slate-400">Lets help {username} get a Coffee</div>
        <div className="text-slate-400">
          {payments.length} Payments. ₹
          {payments.reduce((a, b) => a + b.amount, 0)}raised
        </div>

        <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
          <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            {/* Show list of all the supporters as a leaderboard */}
            <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
            <ul className="mx-5 text-lg">
              {payments.length === 0 && <li>No payments yet</li>}
              {payments.map((payment, index) => {
                return (
                  <li key={index} className="my-4 flex gap-2 items-center">
                    <Image
                      width={33}
                      height={33}
                      src="https://static.vecteezy.com/system/resources/thumbnails/006/487/912/small_2x/hacker-avatar-ilustration-free-vector.jpg"
                      alt="user avatar"
                    />
                    <span>
                      {payment.name} donated{" "}
                      <span className="font-bold">₹{payment.amount}</span> with
                      a message &quot;{payment.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-10 text-white">
            <h2 className="text-2xl font-bold">Make a Payment</h2>
            <div className="flex gap-2 flex-col">
              {/* input for name and message */}
              <div>
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Name"
                />
              </div>
              <input
                onChange={handleChange}
                value={paymentform.message}
                name="message"
                type="text"
                className="w-full p-3 rounded-lg bg-slate-800"
                placeholder="Enter Message"
              />
              <input
                onChange={handleChange}
                value={paymentform.amount}
                name="amount"
                type="text"
                className="w-full p-3 rounded-lg ☐ bg-slate-800"
                placeholder="Enter Amount"
              />
              <button
                type="button"
                onClick={() =>
                  pay(Number.parseInt(paymentform.amount) * 100).catch(
                    (error) => console.error("Payment failed:", error)
                  )
                }
                className="text-white bg-gradient-to-br disabled:from-purple-200 from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                disabled={
                  paymentform.name?.length < 3 ||
                  paymentform.message?.length < 4 ||
                  paymentform.amount?.length < 1
                }
              >
                Pay
              </button>
            </div>
            {/* Or choose from these amounts */}
            <div className="flex flex-col md:flex-row gap-2 mt-5">
              <button
                onClick={() => pay(1000)}
                className="bg-slate-800 p-3 rounded-lg"
              >
                Pay ₹10
              </button>
              <button
                onClick={() => pay(2000)}
                className="bg-slate-800 p-3 rounded-lg"
              >
                Pay ₹20
              </button>
              <button
                onClick={() => pay(3000)}
                className="bg-slate-800 p-3 rounded-1g"
              >
                Pay ₹30
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
