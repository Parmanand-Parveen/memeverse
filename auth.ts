import NextAuth, { DefaultSession } from "next-auth";
import client from "./lib/mongodb";
import {MongoDBAdapter} from "@auth/mongodb-adapter"
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";



export const { handlers, auth, signIn, signOut } = NextAuth({
   adapter :MongoDBAdapter(client),
  session: {
    strategy: "jwt", // ✅ Ensure we are using JWT-based sessions
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub, // ✅ Ensure 'id' is set correctly
          name: profile.name,
          email: profile.email,
          image: profile.picture, // ✅ Use 'picture' instead of 'image'
        };
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(), // ✅ Convert GitHub ID to a string
          name: profile.name || profile.login, // ✅ Fallback to 'login' if 'name' is missing
          email: profile.email,
          image: profile.avatar_url, // ✅ Correct field for GitHub profile images
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
});
