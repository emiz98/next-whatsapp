import { Lock } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Blank from "../components/Blank";

export default function Home() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const setUser = async () => {
        await setDoc(
          doc(db, "users", session.user.uid),
          {
            email: session.user.email,
            username: session.user.name,
            lastSeen: serverTimestamp(),
            userImage: session.user.image,
          },
          { merge: true }
        );
      };
      setUser();
    }
  }, [session]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (status === "unauthenticated") {
    return signIn();
  }

  if (session) {
    return (
      <div className={`${loading && "bg-[#111B21]"} h-screen overflow-hidden`}>
        <Head>
          <title>WhatsApp 1.0</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/whatsapp.ico" />
        </Head>
        {loading ? (
          <div className="pt-[50%] md:pt-[40%] lg:pt-[20%] m-auto flex flex-col  space-y-4 w-72 text-white">
            <img className="w-24 p-3 m-auto" src="/loader.gif" alt="" />
            <LinearProgress className="" color="success" />
            <h3 className="m-auto font-medium">WhatsApp</h3>
            <div className="text-gray-500 m-auto flex items-center space-x-1 text-sm">
              <Lock className="w-4 h-4" /> <span>End-to-End encrypted</span>
            </div>
          </div>
        ) : (
          <div className="flex">
            <Sidebar />
            <Blank />
          </div>
        )}
      </div>
    );
  }
}