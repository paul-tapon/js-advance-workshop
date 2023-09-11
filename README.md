# Javascript advance workshop sample fullstack app


## Database setup

```shell
1. Open Sql Server Management Studio (SSMS)
2. Copy and paste the following scripts below :

use Master

create Database FullStackJSDatabase;

use FullStackJSDatabase;
CREATE TABLE Todos (TodoId INT IDENTITY(1,1), Title NVARCHAR(30),[Description] NVARCHAR(150), [DueDate] DateTime);

insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 1',GETDATE());
insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 2',GETDATE());

3. Press F5 or click Execute
```


## Running API, WEB and E2E

1. Open VSCode and open the folder targetting the root folder of the **js-advance-workshop** folder
2. Inside VSCode, open API's .env file inside **./api** folder and update the database config settings e.g (server,db name, username and password)
3. Open new terminal within VSCode 
4. On ther terminal execute the following commands. 

```shell
cd api
npm install
npx ts-node ./src/index.ts
```

5. Running web : Open another Terminal and execute the following commands.
6. Inside VSCode, open web-ui's environment.ts file inside **./web/src/** folder and update the apiBaseUrl if API's port is different

```shell
cd web
npm install
ng serve --o
```
7. Running e2e : Open another Terminal and execute the following commands.
```shell
cd e2e
npm install
npx cypress run -b chrome --headed --spec "./cypress/e2e/spec.cy.js"  
```