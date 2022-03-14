import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  Search,
  Send,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import {
  addDoc,
  query,
  collection,
  serverTimestamp,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { db } from "../firebase";
import ChatBubble from "./ChatBubble";
import { activeEmailState } from "../atoms/activeUserAtom";
import Moment from "react-moment";

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const router = useRouter();
  const messagesEndRef = useRef(null);
  const email = useRecoilValue(activeEmailState);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (email) {
      const fetchUserDetails = async () => {
        onSnapshot(
          query(collection(db, "users"), where("email", "==", email)),
          (snapshot) => {
            setUser(snapshot.docs.map((doc) => doc.data())[0]);
          }
        );
      };
      fetchUserDetails();
    }
  }, [router.query.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      onSnapshot(
        query(
          collection(db, "chats", router.query.id, "messages"),
          orderBy("timestamp", "asc")
        ),
        (snapshot) => setMessages(snapshot.docs)
      );
    };
    fetchChats();
  }, [db, router.query.id]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input == "") return;
    await addDoc(collection(db, "chats", router.query.id, "messages"), {
      message: input,
      username: session.user.email,
      timestamp: serverTimestamp(),
    }).then((res) => setInput(""));
  };

  return (
    <div className="flex flex-col h-screen backgroundImage">
      <div className="p-5 flex items-center justify-between bg-[#202C33]">
        <div className="flex items-center space-x-5">
          <Avatar src={user?.userImage} />
          <div>
            <h1 className="font-bold text-white">{email}</h1>
            <span className="text-sm text-gray-400">
              {user?.lastSeen ? (
                <Moment className="" fromNow>
                  {user?.lastSeen?.toDate()}
                </Moment>
              ) : (
                "No Available"
              )}
            </span>
          </div>
        </div>
        <div className="space-x-3 text-gray-500">
          <IconButton>
            <Search className="text-white" />
          </IconButton>
          <IconButton>
            <MoreVert className="text-white" />
          </IconButton>
        </div>
      </div>
      <div className="overflow-y-scroll h-full bg-[#171f24] px-2 md:px-24">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.data()} />
        ))}
        <div className="mb-10" ref={messagesEndRef} />
      </div>
      <div className="p-5 flex items-center space-x-2 bg-[#202C33]">
        <IconButton>
          <InsertEmoticon className="text-white" />
        </IconButton>
        <IconButton>
          <AttachFile className="text-white" />
        </IconButton>
        <form onClick={(e) => sendMessage(e)} className="flex-1 ">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Type your message here."
            className="w-full p-2 outline-none bg-[#2a3841] text-white rounded-md"
          />
          <button className="hidden" type="submit">
            temp
          </button>
        </form>

        <div>
          <IconButton>
            <Mic className="text-white" />
          </IconButton>
          <IconButton onClick={(e) => sendMessage(e)}>
            <Send className="text-white -rotate-90" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
