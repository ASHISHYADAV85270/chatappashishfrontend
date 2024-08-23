import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatBoxInput({ handleSendMsg, recieverName }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    const { emoji } = emojiObject;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    const trimmedMessage = msg.trim();
    if (trimmedMessage.length) {
      handleSendMsg(trimmedMessage);
      setMsg("");
    } else {
      setMsg("");
    }
  };

  return (
    <form
      className=" h-full w-full flex items-center justify-center gap-4 bg-[#ffffff34]  p-2 border-t-slate-50 border-t-[0.4px]   border-solid "
      onSubmit={(event) => sendChat(event)}
    >
      <div className="h-full w-[95%]">
        <input
          type="text"
          placeholder={`Message ${recieverName} . . `}
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-full p-2 rounded-md bg-transparent text-white border  focus:outline-none"
        />
      </div>
      <button
        type="submit"
      >
        <span>
          <IoMdSend size={"30px"} className="  text-black hover:text-c3" />
        </span>
      </button>
    </form>
  );
}
