import { APIGatewayEvent, APIGatewayEventRequestContext } from "aws-lambda";
import {
  SESv2Client,
  SendEmailRequest,
  SendEmailCommand,
  BadRequestException,
} from "@aws-sdk/client-sesv2";

export async function sendReminder(
  event: APIGatewayEvent,
  context: APIGatewayEventRequestContext
) {
  const sesClient = new SESv2Client({ region: "us-east-1" });

  const sendEmailCommand = new SendEmailCommand({
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
  } as SendEmailRequest);

  try {
    await sesClient.send(sendEmailCommand);
  } catch (error: unknown) {
    if (error instanceof BadRequestException) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.error({ requestId, cfId, extendedRequestId, stack: error.stack });
    } else {
      console.error({ error });
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ event, context }),
  };
}
