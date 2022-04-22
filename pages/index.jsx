import { ArrowDropDown, Language, Lock } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Blank from "../components/Blank";
import Welcome from "../components/Welcome";

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
    setTimeout(() => setLoading(false), 5000);
  }, []);

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="bg-white">
        <Head>
          <title>WhatsApp 1.0</title>
          <link rel="icon" href="/whatsapp.ico" />
        </Head>
        <header className="bg-[#128c7e] p-6 flex justify-center">
          <div className="max-w-screen-xl flex items-center justify-between">
            <img
              className="w-40 mr-10 md:mr-40"
              src="whatsapp.svg"
              alt="logo"
            />
            <div className="hidden md:flex items-center space-x-8 text-gray-200 uppercase">
              <span className="cursor-pointer font-medium text-white">
                Whatsapp Web
              </span>
              <span className="cursor-pointer hover:text-white">Features</span>
              <span className="cursor-pointer hover:text-white">Download</span>
              <span className="cursor-pointer hover:text-white">Security</span>
              <span className="cursor-pointer hover:text-white">
                Help Center
              </span>
              <div className="flex items-center space-x-1 cursor-pointer group">
                <Language />
                <span>En</span>
                <ArrowDropDown className="group-hover:rotate-180 transition duration-400" />
              </div>
            </div>
            <button
              onClick={signIn}
              className="px-4 py-2 text-white bg-[#10796d] rounded-md ml-5 
            hover:bg-[#0b6157] transition ease-out"
            >
              Sign In
            </button>
          </div>
        </header>
        <Welcome />
      </div>
    );
  }

  if (session) {
    return (
      <div className={`${loading && "bg-[#111B21]"} h-screen overflow-hidden`}>
        <Head>
          <title>WhatsApp 1.0</title>
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
