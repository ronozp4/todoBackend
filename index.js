import express from 'express';
import cors from 'cors';
import tasks from './routes/tasks.js'
import rateLimit  from 'express-rate-limit'
import dotenv  from 'dotenv'

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://10.0.2.2:8081' }));

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });
app.use(limiter);

app.use('/tasks',tasks)

const port = process.env.PORT || 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
