import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { parseUserId } from '../../auth/utils';
import { TodoResource } from '../../resources/TodoResource';
const todoResource = new TodoResource();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Remove a TODO item by id
  console.log("Processing Event ", event);
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ');
  const jwtToken = split[1];

  const todoId = event.pathParameters.todoId;

  const userId = parseUserId(jwtToken);
  const deleteData = await todoResource.deleteToDo(todoId, userId);

  return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': true,
      },
      body: deleteData,
  }
}
