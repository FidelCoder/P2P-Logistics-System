import { ThirdwebAuth } from "@thirdweb-dev/auth";
import dotenv from "dotenv";

dotenv.config();

// Ensure required environment variables are set
const { PRIVATE_KEY, AUTH_DOMAIN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

if (!PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY environment variable is not set");
}

if (!AUTH_DOMAIN) {
  console.warn("AUTH_DOMAIN environment variable is not set. Defaulting to 'localhost'.");
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error("Google OAuth environment variables are not properly set");
}

// ThirdwebAuth Configuration
export const auth = new ThirdwebAuth({
  privateKey, // Private key for signing
  domain: AUTH_DOMAIN || "localhost", // Your app's domain
});

// Google OAuth Configuration
export const googleConfig = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
};
