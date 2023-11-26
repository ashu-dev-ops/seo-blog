import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../models/User";
import connect from "./mongodb";
import GoogleProvider from "next-auth/providers/google";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
export const authOptions: any = {
  // Configure one or more authentication providers
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
  // adapter: MongoDBAdapter(clientPromise, {
  //   databaseName: 'AuthDb'
  // }),
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
      if (account?.provider == "google") {
        await connect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.name,
            });

            await newUser.save();
            return true;
          }
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    // async session({ session, user, token }: any) {
    //   console.log("session info below");
    //   console.log(session, user, token);
    //   session.user.userId = user._id;
    //   return session;
    // },
  },
 
};
