import express from 'express';

const route = express.Router()

export const auth = route.get('/login',
  async (request, response, next) => {
    if (request.query.username === undefined || request.query.username === "") {
      response.send('no query')
    }
    else {
      res.send(`${req.query.username} ${req.url}`);

    }
  }
);
