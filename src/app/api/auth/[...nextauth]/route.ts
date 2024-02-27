import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, _) {
        const response: any = await axios.post(
          "http://localhost:4000/auth/login",
          {
            headers: {
              "Content-type": "application/json",
            },
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        const user = response.data.data;
        console.log("user", user);

        if (user.id && user.token) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in2",
  },
  callbacks: {
    async jwt({ token, user }) {
      token.user = user;
      return token;
    },
    async session({ session, user, token }) {
      session.user = {
        ...session.user,
        id: token.sub,
        iat: token.iat,
        exp: token.exp,
        jti: token.jti,
      } as {
        name: string;
        email: string;
        id: string;
        iat: number;
        exp: number;
        jti: string;
        type: string;
      };
      // console.log(session);
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
