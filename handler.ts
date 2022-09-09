import { APIGatewayEvent } from "aws-lambda";
import {
  SESv2Client,
  SendEmailRequest,
  SendEmailCommand,
  BadRequestException,
} from "@aws-sdk/client-sesv2";

export async function hello(event: APIGatewayEvent) {
  const sesClient = new SESv2Client({ region: "us-east-1" });

  const params: SendEmailRequest = {
    Destination: {
      ToAddresses: ["gabriel.galer@protonmail.com"],
    },
    FromEmailAddress: "gabigaler50@gmail.com",
    Content: {
      Simple: {
        Body: {
          Text: {
            Data: "Hey!",
          },
        },
        Subject: {
          Data: "First SES email!",
        },
      },
    },
  };

  const sendEmailCommand = new SendEmailCommand(params);

  let data;
  try {
    data = await sesClient.send(sendEmailCommand);
    console.log({ data });
  } catch (error: unknown) {
    if (error instanceof BadRequestException) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.error({ requestId, cfId, extendedRequestId, stack: error.stack });
    } else {
      console.error({ error });
    }
  }

  return {
    message: "Go Serverless v3! Your function executed successfully!",
    input: event,
    data,
  };
}
