export type LambdaEventInputType = {
  type: "remind" | "canceled";
  eventId: string;
};
