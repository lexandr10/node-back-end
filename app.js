import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import moviesRouter from './rotes/moviesRoutes.js';
import mongoose from 'mongoose';
import "dotenv/config";
const app = express();


const {DB_HOST} = process.env;

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/movies", moviesRouter);


app.use((err, rej, resp, next) => {
    const {status = 500, message = "Problem with server"} = err;
    resp.status(status).json({message})
})



mongoose.connect(DB_HOST)
.then(() => {
    app.listen(3000, () => {
        console.log('Server 3000 runing');
    })
}).catch((err) => {
    console.log(err.message);
    process.exit(1);
})