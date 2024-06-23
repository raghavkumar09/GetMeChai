import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/app/models/User";
import connectDB from "@/app/db/connectDB";

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();

      if (account.provider === "github") {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            profilePicture: user.image,
            name: user.name,
          });
        }
        return true;
      }
      return false;
    },
    async session({ session, user, token }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
