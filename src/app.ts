import express from "express";
import { googleAuthHandler, googleAuthCallbackHandler } from "./routes/auth";

const app = express();

// Define routes for Google authentication
app.get("/auth/google", googleAuthHandler);
app.get("/auth/google/callback", googleAuthCallbackHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
