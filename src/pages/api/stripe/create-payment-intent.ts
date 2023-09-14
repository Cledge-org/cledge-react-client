import { NextApiRequest, NextApiResponse } from "next";
import { getEnvVariable } from "src/config/getConfig";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const paymentIntent = await stripe.paymentIntents.create({
    confirm: true,
    amount: req.body.newAmount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true
    },
    payment_method: req.body.paymentMethodId,
    return_url: "https://cledge.org/account",
    use_stripe_sdk: true,

  });
  res.json({
    client_secret: paymentIntent.client_secret,
    status: paymentIntent.status
  })
  res.status(200).json({ clientSecret: paymentIntent.client_secret });
};
