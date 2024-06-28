import express from 'express';

const route = express.Router()

export const home = route.get('/', async (req, res, next) => {
  // this middleware called everytime routes changed
  res.send(`Url: ${req.url}, baseUrl:${req.baseUrl} origUrl:${req.originalUrl}`);
  next();
})
