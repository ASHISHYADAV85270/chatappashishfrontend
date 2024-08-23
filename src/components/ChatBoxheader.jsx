import React from "react";
import Logout from "./Logout";
import useravatar from '../assets/useravatar.png';

const ChatBoxheader = ({ username, avataImage }) => {
  return (
    <div className=" box-border h-full overflow-hidden bg-[#1F1F1F] border-b-slate-50 border-b-[0.4px]">
      <div className=" h-full  flex items-center  relative">
        <div className="flex  gap-3   items-center mt-3 ml-5 mb-[0.56rem] ">
          <img
            src={
              avataImage
                ? `data:image/svg+xml;base64,${avataImage}`
                : useravatar
            }
            alt="User avatar"
            className="h-9 rounded-full"
          />
          <h2 className=" uppercase ">{username}</h2>
        </div>
        <div className="absolute right-3">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxheader;

const Container = `
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
