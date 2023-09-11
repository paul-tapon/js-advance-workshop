import { Router } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const acccountRouter = Router();

/* 
    URL : POST http://localhost:8010/todo

    Sample POST request body :
    {
        "username" : "admin",
        "password" :"P@$$w0rd2023"
    }

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjk0MjMxODIxLCJleHAiOjE2OTQyMzI3MjF9.NT3b88z36AAwRHDroVrPIuF-c_ICK3TDI6dWkoMabC8",
        "expiredIn": "2023-09-09T04:12:01.694Z"
    }
*/
acccountRouter.post('/login',async (request, response, next) => {
    try {
        const body = {...request.body};
        //for simulation purposes only, username should be check from a datasource
    console.log('login async');

        if(body.username == 'admin' && body.password=='P@$$w0rd2023')
        {
            const token = generateAccessToken(body.username);
            const expiredIn = moment().add(process.env.JWT_EXPIRATION_SECONDS,'s');
        
            response.json({token,expiredIn});
            return;
        }
        response.statusCode = 400; //bad request
        response.end();
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.end();
    }
});


acccountRouter.get('/login',async (request, response, next) => {
    try {
        const body = {...request.body};
        //for simulation purposes only, username should be check from a datasource
    console.log('login get async');
    response.json({success:true});

    } catch (error) {
        console.log(error);
        response.statusCode = 500;
    }
       
});


function generateAccessToken(username:string) {
    
    const options:jwt.SignOptions  = {
        expiresIn:process.env.JWT_EXPIRATION_SECONDS+'s' //15mins 
    };

    console.log('generating token');
    return jwt.sign({username},String(process.env.SECRET_KEY),options);
}



export default acccountRouter;