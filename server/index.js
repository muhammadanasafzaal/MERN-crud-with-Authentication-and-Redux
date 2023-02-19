import express from 'express';
import cors from 'cors';
import postRoutes from './routes/post.js'
import authRoutes from './routes/auth.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import bodyParser from "body-parser";


const port = process.env.PORT || 4000;
const app = express();
dotenv.config()

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/uploads' ,express.static("uploads"))
app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
  });

//db connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: 'mevndb'
    // useFindAndModify: true,
}).then(() => console.log("Connected to the db"))
.catch((error)=> console.log("error in db", error)) 


//routes prefix
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);


//server start
app.listen(port, ()=> console.log(`server running at ${port}`));