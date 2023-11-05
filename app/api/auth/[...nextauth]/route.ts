import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import connect from "../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/app/lib/authOptions";
// import { authOptions } from "./auth";

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
