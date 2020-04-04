import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { parseUserId } from '../../auth/utils';
import { TodoResource } from '../../resources/TodoResource';
const todoResource = new TodoResource();
const uuidv4 = require('uuid/v4');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Implement creating a new TODO item
  console.log("Processing Event ", event);
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  const userId = parseUserId(jwtToken);
  const toDoItem = await todoResource.createToDo({
        userId: userId,
        todoId: uuidv4(),
        createdAt: new Date().getTime().toString(),
        done: false,
        ...newTodo,
    });

  return {
      statusCode: 201,
      headers: {
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          "item": toDoItem
      }),
  }
}
