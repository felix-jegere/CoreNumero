import dotenv from 'dotenv';
import app from '../backend/src/app.js';

dotenv.config({ path: '.env' });

export default function handler(req, res) {
  return app(req, res);
}
