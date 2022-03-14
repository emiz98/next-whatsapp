import { Avatar } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { db } from "../firebase";
import { activeEmailState } from "../atoms/activeUserAtom";

const ChatComp = ({ id, users }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [existingRecipient, setExistingRecipient] = useState();
  const [email, setEmail] = useRecoilState(activeEmailState);

  useEffect(() => {
    users.splice(users.indexOf(session.user.email), 1);
    const fetchData = async () => {
      onSnapshot(
        query(collection(db, "users"), where("email", "==", users[0])),
        (snapshot) => {
          setExistingRecipient(snapshot.docs.map((doc) => doc.data())[0]);
          // console.log(snapshot.docs.map((doc) => doc.data())[0]);
        }
      );
    };
    fetchData();
  }, []);

  const enterChat = () => {
    setEmail(existingRecipient ? existingRecipient.email : users[1]);
    router.push(`/chat/${id}`);
  };

  return (
    <div
      onClick={enterChat}
      className="flex items-center space-x-2 mb-2 hover:bg-gray-700 cursor-pointer p-2 rounded-md"
    >
      <Avatar src={existingRecipient?.userImage} />
      <span className="font-medium text-md text-white">
        {existingRecipient ? existingRecipient.username : users[1]}
      </span>
    </div>
  );
};

export default ChatComp;
