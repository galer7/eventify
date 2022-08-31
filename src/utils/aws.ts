import { SNSClient } from "@aws-sdk/client-sns";

// Set the AWS Region.
const REGION = "us-east-1";

const snsClient = new SNSClient({ region: REGION });

export { snsClient };
