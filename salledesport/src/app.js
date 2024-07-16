import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './utils/database.js';
import routes from './routes.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', routes);

connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


