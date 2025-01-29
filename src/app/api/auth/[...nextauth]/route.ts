import { NextAuthConfig } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(NextAuthConfig);



export const GET = handler;
export const POST = handler;