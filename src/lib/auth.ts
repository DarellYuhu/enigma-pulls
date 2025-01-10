import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { FacebookClient } from "./facebook-client";
import { AxiosError } from "axios";

type Data = {
  token: string;
  user: {
    id: string;
    displayName: string;
    username: string;
    role: string;
  };
};

export const { signIn, signOut, auth, handlers } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(request) {
        try {
          const { data }: { data: Data } = await FacebookClient.post(
            "/auth/sign-in",
            request
          );
          return data;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new CredentialsSignin("Wrong username or password");
          }
        }
      },
    }),
  ],
  // callbacks: {
  //   authorized: async ({ auth }) => {
  //     // Logged in users are authenticated, otherwise redirect to login page
  //     return !!auth;
  //   },
  //   session: async ({ session, token }) => {
  //     // @ts-ignore
  //     session.user = token.user;
  //     return session;
  //   },
  //   jwt: async ({ token, user }) => {
  //     if (user) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  // },
});
