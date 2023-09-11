# Javascript advance workshop sample fullstack app


## Database setup

```shell
1. Open Sql Server Management Studio (SSMS)
2. Copy and paste the follwoing scripts below

use Master

create Database FullStackJSDatabase;

use FullStackJSDatabase;
CREATE TABLE Todos (TodoId INT IDENTITY(1,1), Title NVARCHAR(30),[Description] NVARCHAR(150), [DueDate] DateTime);

insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 1',GETDATE());
insert Todos (Title,Description,DueDate) VALUES('Test todo 1','Test todo description 2',GETDATE());

3. Press F5 or click Execute
```

1. A numbered list
    1. A nested numbered list
    2. Which is numbered
2. Which is numbered