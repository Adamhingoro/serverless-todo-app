import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { TodoResource } from '../../resources/TodoResource';
const todoResource = new TodoResource();

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  console.log("Processing Event ", event);
  const todoId = event.pathParameters.todoId;

  const URL = await todoResource.generateUploadUrl(todoId);

  return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({
          uploadUrl: URL,
      })
  };
}
