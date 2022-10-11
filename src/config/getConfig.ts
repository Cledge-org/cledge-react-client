type EnvVariables =
  | "NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY"
  | "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"
  | "NEXT_PUBLIC_FIREBASE_PROJECT_ID"
  | "NEXT_PUBLIC_FIREBASE_APP_ID"
  | "GOOGLE_ID"
  | "GOOGLE_SECRET"
  | "NEXT_AUTH_SECRET"
  | "MONGO_URL"
  | "NEXT_SIGNUP_PASS"
  | "STRIPE_SECRET_KEY"
  | "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
  | "PRICE_ID"
  | "HOURS_PRICE_ID";

export const getEnvVariable = (variable: EnvVariables) => {
  return process.env[variable];
};
