import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../models/User";
import connect from "./mongodb";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./mongoClientPromise";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
export const authOptions: any = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: "ashutosh",
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          console.log(user);
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId:
        "1050913679320-ame7hulg0dlj7rcq7uqpn2phjed46nnj.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user?.role ? user?.role : "role",
        };
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      // console.log("session i am returning", session);

      return session;
    },
  },
};
