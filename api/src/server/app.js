import express from "express";
import { asyncHandler } from "./middleware.js";

// webserver

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({
    message: 'pong',
    now: new Date().toISOString(),
  });
});

export default app;