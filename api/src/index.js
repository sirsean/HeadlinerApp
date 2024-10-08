import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from "http-proxy-middleware";
import app from './server/app.js';
import { asyncHandler } from './server/middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// set up the UI server

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "production") {
  // serve static files from vite-app
  app.use(express.static(path.join(__dirname, '..', '..', 'dist')));

  // handle all other routes within vite-app
  app.get('*', asyncHandler(async (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  }));
} else {
  // proxy vite development server
  app.use('/', createProxyMiddleware({
    target: 'http://localhost:5173',
    changeOrigin: true,
    ws: true,
  }));
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port: ${port}`);
});
