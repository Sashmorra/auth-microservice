import dotenv from 'dotenv';
import { connectToDB } from '../db/db';
import { App } from './app';
dotenv.config();


const start = async () => { 
    const app = new App();
    app.init();
    await connectToDB();
}

start();
