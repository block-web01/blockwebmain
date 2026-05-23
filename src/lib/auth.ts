import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        const email = credentials.email.toLowerCase();
        const password = credentials.password;

        // 1. Check Admin Credentials from Env
        if (
          email === process.env.ADMIN_EMAIL?.toLowerCase() &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "The 5s Founder", email: process.env.ADMIN_EMAIL, role: "admin" };
        }

        // 2. Check Database Credentials
        await connectDB();
        const dbUser = await User.findOne({ email }).select("+password");
        if (!dbUser) {
          throw new Error("No account found with this email");
        }

        const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect password");
        }

        // Update login stats
        dbUser.lastLogin = new Date();
        if (!dbUser.loginHistory) dbUser.loginHistory = [];
        dbUser.loginHistory.push(new Date());
        await dbUser.save();

        return {
          id: dbUser._id.toString(),
          name: dbUser.name,
          email: dbUser.email,
          role: dbUser.role || "user",
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        if (user?.email) {
          const email = user.email.toLowerCase();
          // Check if admin is logging in via Google
          if (
            email === process.env.ADMIN_EMAIL?.toLowerCase() ||
            email === "the5sfounder@gmail.com"
          ) {
            return true;
          }

          try {
            await connectDB();
            const existingUser = await User.findOne({ email });
            
            if (!existingUser) {
              // Automatically register the Google user
              const newUser = await User.create({
                name: user.name || email.split("@")[0] || "Google User",
                email,
                role: "user",
                lastLogin: new Date(),
                loginHistory: [new Date()],
              });
              user.id = newUser._id.toString();
              user.role = "user";
            } else {
              // Update existing user login stats
              existingUser.lastLogin = new Date();
              if (!existingUser.loginHistory) existingUser.loginHistory = [];
              existingUser.loginHistory.push(new Date());
              await existingUser.save();
              user.id = existingUser._id.toString();
              user.role = existingUser.role || "user";
            }
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
        const email = user.email?.toLowerCase();
        if (email) {
          if (
            email === process.env.ADMIN_EMAIL?.toLowerCase() ||
            email === "the5sfounder@gmail.com"
          ) {
            token.id = "admin";
            token.role = "admin";
          } else {
            await connectDB();
            const dbUser = await User.findOne({ email });
            if (dbUser) {
              token.id = dbUser._id.toString();
              token.role = dbUser.role || "user";
            } else {
              token.id = user.id;
              token.role = user.role || "user";
            }
          }
        } else {
          token.id = user.id;
          token.role = user.role || "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
