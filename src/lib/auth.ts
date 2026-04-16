import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "The 5s Founder", email: process.env.ADMIN_EMAIL, role: "admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (user?.email && user.email !== process.env.ADMIN_EMAIL && user.email !== "the5sfounder@gmail.com") {
          try {
            await connectDB();
            const existingUser = await User.findOne({ email: user.email });
            
            if (!existingUser) {
              return "/?error=needs_signup";
            }

            await User.findOneAndUpdate(
              { email: user.email },
              { 
                $set: { lastLogin: new Date() },
                $push: { loginHistory: new Date() } 
              }
            );
          } catch (error) {
            console.error("Error logging sign in:", error);
            return false;
          }
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || (user.email === "the5sfounder@gmail.com" ? "admin" : "user");
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
