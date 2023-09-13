import sql from 'mssql';
import appConfig from '../infrastructure';

export class todoRepository {
   constructor() {}

   async getAll() {
      const pool = await sql.connect(appConfig.database);

      //TODO : if expected to return thousand records implement pagination and projection
      var query = await pool
         .request()
         .query('select todoId,title,[description],dueDate from todos');

      return query.recordset;
   }

   async search(title:string,description:string) {
      const pool = await sql.connect(appConfig.database);

      title = title.replace("'","").replace("-","").replace(";",""); //apply basic sanitation
      description = description.replace("'","").replace("-","").replace(";",""); //apply basic sanitation

      //TODO : if expected to return thousand records implement pagination and projection
      var query = await pool
         .request()
         .query(`select todoId,title,[description],dueDate from todos where title like '%${title}%' or description like '%${description}%' `);

      return query.recordset;
   }

   async create(body: any) {
      const query =
         'INSERT into Todos (Title,[Description],DueDate)  VALUES(@title,@description,@dueDate) ; SELECT SCOPE_IDENTITY() as todoId';
      const pool = await sql.connect(appConfig.database);

      const insertTodo = await pool
         .request()
         .input('title', body.title)
         .input('description', body.description)
         .input('dueDate', body.dueDate)
         .query(query);

      const todoId = insertTodo?.recordset[0]?.todoId; //returned the last in

      return todoId;
   }

   async getById(id: number) {
      let pool = await sql.connect(appConfig.database);
      let todos = await pool
         .request()
         .input('id', id)
         .query(
            'select todoId,title,[description],dueDate from Todos where TodoId=@id'
         );
      return todos.recordset[0];
   }

   async update(body: any, id: number) {
      const query =
         'UPDATE Todos set Title=@title,[Description]=@description,DueDate=@dueDate where TodoId=@id';
      const pool = await sql.connect(appConfig.database);

      const updateTodo = await pool
         .request()
         .input('title', body.title)
         .input('description', body.description)
         .input('dueDate', body.dueDate)
         .input('id', id)
         .query(query);

      return updateTodo?.rowsAffected[0];
   }
}
