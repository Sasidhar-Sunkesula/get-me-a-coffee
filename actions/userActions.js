"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db.js/connectDb";

export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({ username: to_username });
  const secret = user.razorpaysecret;
  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  // create a payment object which shows a pending payment in the database
  await Payment.create({
    oid: x.id,
    amount: amount / 100,
    to_user: to_username,
    name: paymentform.name,
    message: paymentform.message,
  });

  return x;
};

export const fetchuser = async (username) => {
  let u = await User.findOne({ username: username });
  console.log("uu", u);
  let user = u.toObject({ flattenObjectIds: true });
  console.log("are", user);
  return user;
};

export const fetchpayments = async (username) => {
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({ to_user: username })
    .sort({ amount: -1 })
    .limit(10);
  p = p.map((doc) => {
    const obj = doc.toObject();
    delete obj.__v;
    return obj;
  });
  console.log("payments", p);
  return p;
};

export const updateProfile = async (data, oldusername) => {
  let ndata = Object.fromEntries(data);

  // if the username is changed, check if the new username is available
  if (oldusername !== ndata.username) {
    let u = await User.findOne({ username: ndata.username });
    if (u) {
      return { error: "Username already exists" };
    }
    await User.updateOne({ email: ndata.email }, ndata);
    // Now update all the usernames in the payments table
    await Payment.updateMany(
      { to_user: oldusername },
      { to_user: ndata.username }
    );
  }
  await User.updateOne({ email: ndata.email }, ndata);
};
