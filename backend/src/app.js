import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import responseRoutes from './routes/response.route.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

// API Routes
app.use('/api', responseRoutes);

// Serve index.html for all routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

export default app;