import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(express.json())

// import morgan from 'morgan';
import { connectDb } from './Utils/db.js';

import User from './Routes/User.js';
import File from './Routes/File.js';
import Anayltics from './Routes/Anayltics.js'
import Organization from './Routes/Organization.js';

app.use(morgan("dev"))


connectDb();

app.use("/api/users", User);
app.use("/api/organizations", Organization);
app.use("/api/files", File);
app.use("/api/analytics", Anayltics);


const PORT = process.env.PORT || 4000;


app.listen(PORT , ()=> console.log(`server running on port ${PORT}`))