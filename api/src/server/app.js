import express from "express";
import { asyncHandler } from "./middleware.js";
import { getObject, downloadAll, downloadCurrent } from '../data/r2.js';
import sortBy from 'sort-by';

// webserver

const app = express();

app.get('/api/ping', (req, res) => {
  res.json({
    message: 'pong',
    now: new Date().toISOString(),
  });
});

// get all the news
app.get('/api/all', asyncHandler(async (req, res) => {
  const all = await downloadAll();
  res.json(all);
}));

// get the current news item
app.get('/api/current', asyncHandler(async (req, res) => {
  const current = await downloadCurrent();
  res.json(current);
}));

// get the recent news items
app.get('/api/recent', asyncHandler(async (req, res) => {
  const recent = await downloadAll()
    .then(all => all.metadata.sort(sortBy('-at')))
    .then(all => all.slice(0, 5));
  res.json(recent);
}));

// serve the images
app.get('/image/:id.png', asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(`get image ${id}`);

  // download the image from the S3 bucket
  const obj = await getObject(`headlines/${id}/image.png`);

  res.set('Content-Type', 'image/png');
  obj.Body.pipe(res);
}));

// each image has a thumbnail
app.get('/thumb/:id.png', asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(`get thumbnail ${id}`);

  // download the image from the S3 bucket
  const obj = await getObject(`headlines/${id}/thumbnail.png`);

  res.set('Content-Type', 'image/png');
  obj.Body.pipe(res);
}));

// serve the metadata
app.get('/metadata/:id.json', asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(`get metadata ${id}`);

  // download the metadata from the S3 bucket
  const obj = await getObject(`headlines/${id}/metadata.json`);

  res.set('Content-Type', 'application/json');
  obj.Body.pipe(res);
}));

export default app;