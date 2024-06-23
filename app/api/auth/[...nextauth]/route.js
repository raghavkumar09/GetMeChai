import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/app/models/User"
import Payment from "@/app/models/Payment"
import connectDB from "@/app/db/connectDB"

const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // connect to database moongoose
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
    },
    async session({ session, user, token }) {
      await connectDB();

      const dbUser = await User.findOne({ email: session.user.email });
      // console.log("dbUser", dbUser);
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  }
});

export { authOptions as GET, authOptions as POST }
