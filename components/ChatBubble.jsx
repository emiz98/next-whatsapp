import { Done } from "@mui/icons-material";
import moment from "moment";
import { useSession } from "next-auth/react";
import React from "react";
import Moment from "react-moment";

const ChatBubble = ({ message }) => {
  const { data: session } = useSession();
  return (
    <div
      className={`flex ${
        session.user.email === message.username && "justify-end"
      } w-full`}
    >
      <div
        className={`${
          session.user.email === message.username
            ? "bg-[#005C4B]"
            : "bg-[#202C33]"
        } shadow-md rounded-md m-3 flex flex-col w-2/5 md:w-1/5`}
      >
        <span className="p-3 text-md text-white">{message.message}</span>
        <div className="flex pr-2 pb-2 justify-end items-center space-x-2 text-gray-400">
          <Moment className="text-xs" fromNow>
            {message.timestamp?.toDate()}
          </Moment>
          <Done className="text-sm" />
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
