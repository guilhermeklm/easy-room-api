import { Router } from 'express';

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
  res.send("Version 1.0.0");
});