import express from 'express';
import todoRouter from './todo/todoRoutes';

import cors  from 'cors'
import bodyParser  from 'body-parser'

import * as dotenv from "dotenv";
import acccountRouter from './account/accountRoutes';

dotenv.config({ path: __dirname+'/../.env' });

const app = express();

//Add middlewares heres :
app.use(cors());
app.use(bodyParser.json());
//End of middlewares


//Routes
app.use('/todo', todoRouter);
app.use('/account', acccountRouter);
//End of Routes


app.listen(process.env.PORT_NUMBER,()=>{
  console.log(`API running at ${process.env.PORT_NUMBER}`);
});
