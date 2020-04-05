import {TodoItem} from "../models/TodoItem";
import {TodoResource} from "../resources/TodoResource";
import {parseUserId} from "../auth/utils";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";

const uuidv4 = require('uuid/v4');
const todoResource = new TodoResource();

// Get all Todos by User ID
export async function getAllToDo(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoResource.getAllToDo(userId);
}

// Updating the Todo by userid, todoid and the new todo object.
export function updateToDo(updateTodoRequest: UpdateTodoRequest, todoId: string, jwtToken: string): Promise<TodoUpdate> {
    const userId = parseUserId(jwtToken);
    return todoResource.updateToDo(updateTodoRequest, todoId, userId);
}

// Deleting the todo by todoid and user id 
export function deleteToDo(todoId: string, jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken);
    return todoResource.deleteToDo(todoId, userId);
}

// Generating the signed URL for the S3 bucket
export function generateUploadUrl(todoId: string): Promise<string> {
    return todoResource.generateUploadUrl(todoId);
}

// Create TODO
export function createToDo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const userId = parseUserId(jwtToken);
    return todoResource.createToDo({
        userId: userId,
        todoId: uuidv4(),
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}