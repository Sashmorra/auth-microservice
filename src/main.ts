import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const start = async () => {
  try {
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  }
  catch (error) {
    console.log(error);
  }
}

start();
