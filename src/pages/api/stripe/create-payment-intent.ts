import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { product_id } = JSON.parse(req.body);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: product_id === "uw-package" ? 10000 : product_id === "premium" ? 500 : 50,
    currency: "usd",
    payment_method_types: ["card"],
  });
  console.log(paymentIntent.amount);
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
