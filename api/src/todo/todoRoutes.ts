import { Router } from 'express';
import { todoRepository } from './todoRepository';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { checkJwt } from '../middlewares/checkAccessToken';
import { Request, Response, NextFunction } from 'express';


const todoRouter = Router();
const repository = new todoRepository();

const postTodoSchema = {
   type: 'object',
   dynamicDefaults: {
      dueDate: 'datetime',
   },
   properties: {
      title: { type: 'string' },
      description: { type: 'string' },
      dueDate: {
         type: 'string',
         format: 'date-time',
      },
   },
   required: ['title'],
   additionalProperties: false,
};

/* 
    URL : GET http://localhost:8010/todo

    Sample POST response body :
    [
        {
            "todoId": 1,
            "title": "Eat Lunch",
            "description": "Test only",
            "dueDate": "2023-09-05T00:00:00.000Z"
        },
        {
            "todoId": 2,
            "title": "Do Laundry",
            "description": "Test again",
            "dueDate": "2023-09-05T00:00:00.000Z"
        },
        {
            "todoId": 3,
            "title": "Paul",
            "description": "Evangel",
            "dueDate": "2023-09-10T00:00:00.000Z"
        }
    ]
*/
todoRouter.get('/', [checkJwt],async (request:Request, response:Response, next:NextFunction) => {
   try {
      response.json(await repository.getAll());
   } catch (err) {
      response.statusCode = 500;
      console.log(err);
      response.end();
   }
});

todoRouter.get('/search', [checkJwt],async (request:Request, response:Response, next:NextFunction) => {
   try {
      response.json(await repository.search(request.query.title as string,request.query.description as string));
   } catch (err) {
      response.statusCode = 500;
      response.end();
   }
});

/* 
    URL : POST http://localhost:8010/todo

    Sample POST request body :
    {
        "title" : "test",
        "description" :"Sample description",
        "dueDate" : "2023-01-01"
    }

    Sample POST response body :
    {
        "title": "test",
        "description": "Sample description",
        "dueDate": "2023-01-01",
        "todoId": 1033
    }
*/
todoRouter.post('/', [checkJwt],async (request:Request, response:Response, next:NextFunction) => {
   try {
      
      const body = { ...request.body };
      const ajv = new Ajv();

      const addKeywords = require('ajv-keywords');

      addKeywords(ajv);

      const schema = {
         type: 'object',
         properties: {
            dueDate: {
                type: 'string',
                format: 'date-time',
            },
            title: { type: 'string' },
            description: { type: 'string' },
         },
         required : ['title','description','dueDate']
      };



      const dateTimeRegex = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$');
      ajv.addFormat('date-time', {
        validate: (dateTimeString:string) => dateTimeRegex.test(dateTimeString)
      });


      const validate = ajv.compile(schema);
      const valid = validate(body);

      if (!valid)
      {
        console.log('Invalid: ' + ajv.errorsText(validate.errors));
        response.statusCode=400;
        response.json({errors : ajv.errorsText(validate.errors)});
        response.end();
        return;
      }

      const todoId = await repository.create(request.body);
      response.statusCode = 201;
      response.json({ ...body, todoId });
   } catch (error) {
      console.log(error);
      response.statusCode = 500;
      response.end();
   }
});

/* 
    URL : GET http://localhost:8010/todo/1

    Sample POST response body :
    {
        "todoId": 1,
        "title": "Eat Lunch",
        "description": "Test only",
        "dueDate": "2023-09-05T00:00:00.000Z"
    },
*/
todoRouter.get('/:id',[checkJwt],async (request:Request, response:Response, next:NextFunction) => {
   try {
      const todo = await repository.getById(Number(request.params.id));
      response.json({ ...todo });
   } catch (error) {
      response.statusCode = 500;
      response.end();
   }
});

/*
    URL : PATCH http://localhost:8010/todo/1033

    Sample request body:
    {
        "title" : "1033 test",
        "description" :"test 1033",
        "dueDate" : "2023-02-02"
    }

    Sample response body:
    {
        "success" : true
    }
*/
todoRouter.patch('/:id', [checkJwt],async (request:Request, response:Response, next:NextFunction) => {
   try {
      const body = { ...request.body };
      const success =
         (await repository.update(request.body, Number(request.params.id))) > 0;
      response.json({ success });
      response.statusCode = 204;
   } catch (error) {
      response.statusCode = 500;
      response.end();
   }
});

todoRouter.delete('/:id');

export default todoRouter;
