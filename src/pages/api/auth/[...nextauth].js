import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../libs/prisma";

const options = {
  providers: [
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    error: "/auth/error",
    verifyRequest: "/auth/verify-account",
  },
};

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
