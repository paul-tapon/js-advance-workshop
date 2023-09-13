import express from 'express';
import todoRouter from './todo/todoRoutes';

import cors  from 'cors'
import bodyParser  from 'body-parser'
import acccountRouter from './account/accountRoutes';
import appConfig from './infrastructure';


const app = express();

//Add middlewares heres :
app.use(cors());
app.use(bodyParser.json());
//End of middlewares


//Routes
app.use('/todo', todoRouter);
app.use('/account', acccountRouter);
//End of Routes


app.listen(appConfig.port,()=>{
  console.log(`API running at ${appConfig.port}`);
});
