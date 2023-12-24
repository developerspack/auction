import { db } from "@/lib/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      // I skipped the line below coz it gave me a TypeError
      // session.accessToken = token.accessToken;
      session.user.id = token.id;

      const { id, image, name, email } = session.user;

      setDoc(doc(db, "users", id), {
        id: id,
        name: name,
        email: email,
        image: image,
        createdAt: Timestamp.now().toDate().toString(),
      });

      return session;
    },
  },
});

export { handler as GET, handler as POST };
