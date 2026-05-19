import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { errors as celebrateErrors } from 'celebrate';
import path from 'path';
import router from './routes/routes';
import { errorLogger, requestLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { PORT, DB_ADDRESS = 'mongodb://localhost:27017/weblarek' } = process.env;
mongoose.connect(DB_ADDRESS);
const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(celebrateErrors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
  