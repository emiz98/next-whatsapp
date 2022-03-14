import React, { useEffect, useState } from "react";
import { Avatar, IconButton, Button } from "@mui/material";
import { Chat, MoreVert, Search } from "@mui/icons-material";
import * as EmailValidator from "email-validator";
import { signOut, useSession } from "next-auth/react";
import ChatComp from "./ChatComp";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const Sidebar = () => {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (session) getChats();
  }, []);

  const createChat = async () => {
    const input = prompt("Please enter an email address");

    if (!input) return;

    if (EmailValidator.validate(input) && input !== session.user.email) {
      addChat(input);
    }
  };

  const getChats = async () => {
    onSnapshot(
      query(
        collection(db, "chats"),
        where("users", "array-contains", session.user.email)
      ),
      (snapshot) => {
        // setChats(snapshot.docs.map((doc) => doc.data()));
        setChats(snapshot.docs);
      }
    );
  };

  const addChat = async (recipientEmail) => {
    onSnapshot(
      query(collection(db, "users"), where("email", "==", recipientEmail)),
      query(
        collection(db, "chats"),
        where("users", "==", ["menadithrox1@gmail.com", recipientEmail])
      ),
      (snapshot1) => {
        if (snapshot1.docs.map((doc) => doc.data()).length > 0) {
          onSnapshot(
            query(
              collection(db, "chats"),
              where("users", "==", ["menadithrox1@gmail.com", recipientEmail])
            ),
            (snapshot2) => {
              if (snapshot2.docs.map((doc) => doc.data()).length > 0) {
                return;
              } else {
                const docRef = addDoc(collection(db, "chats"), {
                  users: [session.user.email, recipientEmail],
                });
              }
            }
          );
        } else {
          alert("No such user registered");
          return;
        }
      }
    );
  };

  return (
    <div className="p-5 bg-[#202C33] border-r-2 border-[#171F24]">
      <div className="space-y-10 mb-10">
        <div className="flex items-center justify-between">
          <Avatar
            onClick={signOut}
            src={session?.user?.image}
            className="cursor-pointer hover:scale-105"
          />
          <div className="flex items-center">
            <IconButton>
              <Chat className="text-white" />
            </IconButton>
            <IconButton>
              <MoreVert className="text-white" />
            </IconButton>
          </div>
        </div>
        <div className="flex items-center">
          <Search className="text-white" />
          <input
            className="ml-3 outline-none bg-[#202C33] text-white"
            placeholder="Search in chats"
          />
        </div>
        <Button
          className="w-full text-white bg-gray-700 hover:bg-gray-800"
          onClick={createChat}
        >
          Start a new chat
        </Button>
      </div>

      {/* Chats */}
      {chats?.map((chat, i) => (
        <ChatComp key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </div>
  );
};

export default Sidebar;
