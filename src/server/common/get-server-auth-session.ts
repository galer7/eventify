// Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { unstable_getServerSession } from "next-auth";
import { makeAuthOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";

// Next API route example - /pages/api/restricted.ts
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return await unstable_getServerSession(
    ctx.req,
    ctx.res,
    nextAuthOptions(ctx.req as NextApiRequest, ctx.res as NextApiResponse)
  );
};
