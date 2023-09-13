export interface Todo
{
    todoId:number;
    title:string;
    description:string;
    dueDate:Date;
    isActive: boolean;
    isCompleted:boolean;
}

export interface TodoPatchResponse
{
    success:boolean;
}