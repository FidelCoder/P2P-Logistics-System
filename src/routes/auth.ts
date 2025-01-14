import { Request, Response } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;

// Validate required environment variables
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_CALLBACK_URL) {
  throw new Error("Missing required Google OAuth environment variables.");
}

// Define the user type
interface User {
  id: string;
  displayName: string;
  emails: { value: string }[];
}

// Configure Passport with the Google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: VerifyCallback
    ) => {
      try {
        // Construct a user object
        const user: User = {
          id: profile.id,
          displayName: profile.displayName,
          emails: profile.emails || [],
        };

        // Pass the user object to Passport
        done(null, user);
      } catch (error) {
        console.error("Error during Google authentication:", error);
        done(error);
      }
    }
  )
);

// Serialize user to the session
passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

// Deserialize user from the session
passport.deserializeUser((user: User, done) => {
  done(null, user);
});

// Route handler to initiate Google authentication
export const googleAuthHandler = passport.authenticate("google", {
  scope: ["profile", "email"],
});

// Route handler for Google callback
export const googleAuthCallbackHandler = [
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    // Debug logged-in user
    console.log("Authenticated user:", req.user);

    // Redirect to dashboard or desired location upon successful login
    res.redirect("/dashboard");
  },
];
