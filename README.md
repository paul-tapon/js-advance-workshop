# Javascript advance workshop sample fullstack app


## Database setup

```shell
1. Open Sql Server Management Studio (SSMS)
2. Copy and paste the follwoing scripts below :

use Master

create Database FullStackJSDatabase;

use FullStackJSDatabase;
CREATE TABLE Todos (TodoId INT IDENTITY(1,1), Title NVARCHAR(30),[Description] NVARCHAR(150), [DueDate] DateTime);

insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 1',GETDATE());
insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 2',GETDATE());

3. Press F5 or click Execute
```


## Running API and WEB

1. Open VSCode and open the folder targetting the root folder of the **js-advance-workshop** folder
2. Open new terminal within VSCode 
3. On ther terminal execute the following commands. 

```shell
cd api
npm install
npx ts-node ./src/index.ts
```


4. Openn new Terminal