import sql from 'mssql';
import dbConfig from '../infrastructure/dbConfig';

export class todoRepository
{
    constructor(){
        
    }

    async getAll() 
    {
        const pool = await sql.connect(dbConfig());

        //TODO : if expected to return thousand records implement pagination and projection
        var query = await pool.request().query('select todoId,title,[description],dueDate from todos');

        return query.recordset;
    }

    async create(body:any) {
        const query= 'INSERT into Todos (Title,[Description],DueDate)  VALUES(@title,@description,@dueDate) ; SELECT SCOPE_IDENTITY() as todoId';
        const pool = await sql.connect(dbConfig());

        const insertTodo = await 
           pool.request()
           .input("title",body.title)
           .input("description",body.description)
           .input("dueDate",body.dueDate)
           .query(query);

        const todoId= insertTodo?.recordset[0]?.todoId; //returned the last in

        return todoId;
    }

    async getById(id:number)
    {
        let pool = await sql.connect(dbConfig());
        let todos = await 
                    pool.request()
                    .input("id",id)
                    .query("select todoId,title,[description],dueDate from Todos where TodoId=@id");
        return todos.recordset[0];
    }
    

    async update(body:any,id:number) {
        const query= 'UPDATE Todos set Title=@title,[Description]=@description,DueDate=@dueDate where TodoId=@id';
        const pool = await sql.connect(dbConfig());

        const updateTodo = await 
           pool.request()
           .input("title",body.title)
           .input("description",body.description)
           .input("dueDate",body.dueDate)
           .input("id",id)
           .query(query);

        return updateTodo?.rowsAffected[0];
    }
}
