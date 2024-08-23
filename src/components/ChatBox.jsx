import React, { useEffect, useState, useRef } from "react";
import ChatBoxheader from "./ChatBoxheader";
import ChatBoxInput from "./ChatBoxInput";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getallmessagesurl,
  handleSendMsgurl,
  sendMessageRouteurl,
} from "../utils/routes";

const ChatBox = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**get all the messages of that particular person to person */
  useEffect(() => {
    getallmessages();
    async function getallmessages() {
      try {
        setLoading(true);
        const from = currentUser._id;
        const to = currentChat._id;
        const resp = await axios.post(
          getallmessagesurl,
          {
            from,
            to,
          },
          { withCredentials: true }
        );
        const { projectMessages } = resp.data;
        setMessages(projectMessages);
      } catch (error) {
        console.log("Error");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
  }, [currentChat]);

  /*** sending messages */
  const handleSendMsg = async (msg) => {
    // console.log(msg);

    const data = await axios.post(
      handleSendMsgurl,
      { from: currentUser._id, to: currentChat._id, message: msg },
      { withCredentials: true }
    );
    if (data.data.success) {
      toast.success(data.data.message);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: data._id,
        msg,
      });
      await axios.post(sendMessageRouteurl, {
        from: data._id,
        to: currentChat._id,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
    } else {
      toast.error(data.data.message);
    }
  };

  return (
    <div className="flex flex-col  h-full  w-full ">
      <div className="h-[7vh] ">
        <ChatBoxheader
          username={currentChat.username}
          avataImage={currentChat.avataImage}
        />
      </div>
      <div className="chat-messages  p-7 flex flex-col overflow-auto  gap-4 h-[86vh]   bg-[#1F0F2C]  opacity-95">
        {!loading &&
          messages.map((message, index) => {
            return (
              <div key={index}>
                <div
                  className={`message   flex  items-center  ${
                    message.fromSelf
                      ? "sended justify-end "
                      : "recieved  justify-start"
                  }`}
                >
                  <div
                    className={`content text-lg max-w-[40%] break-words  px-5 py-3   rounded-3xl ${
                      message.fromSelf
                        ? "text-[#FFF] bg-[#830EF7]"
                        : "text-[#BABABA] bg-[#1F1F1F]"
                    } `}
                  >                  
                      {message.message}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="h-[7vh]">
        <ChatBoxInput handleSendMsg={handleSendMsg} recieverName={currentChat.username} />
      </div>
      <Toaster />
    </div>
  );
};

export default ChatBox;
