import { APIGatewayEvent } from "aws-lambda";
import {
  SESv2Client,
  SendEmailRequest,
  SendEmailCommand,
  BadRequestException,
} from "@aws-sdk/client-sesv2";
import { SNSClient, CreateTopicCommand } from "@aws-sdk/client-sns";

export async function hello(event: APIGatewayEvent) {
  const {} = event;
  const sesClient = new SESv2Client({ region: "us-east-1" });
  const snsClient = new SNSClient({ region: "us-east-1" });

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

  //   const sendSmsCommand = new

  let data;
  try {
    data = await sesClient.send(sendEmailCommand);
  } catch (error: unknown) {
    if (error instanceof BadRequestException) {
      const { requestId, cfId, extendedRequestId } = error.$metadata;
      console.error({ requestId, cfId, extendedRequestId, stack: error.stack });
    } else {
      console.error({ error });
    }
  }

  return {
    input: event,
    data,
  };
}
