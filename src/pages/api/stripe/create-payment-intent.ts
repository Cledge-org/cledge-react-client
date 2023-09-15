import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.newAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true
    },
  });
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
