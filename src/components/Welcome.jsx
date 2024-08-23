import React from "react";
import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser, setCurrentChat, currcontacts }) => {
  return (
    <div className="flex items-center justify-center flex-col h-full w-full ">
      <img src={Robot} alt="robot" className="h-[20rem]" />
      <h1>
        Welcome ,
        <span className="text-blue-800 uppercase ml-1">
          {currentUser?.username}!
        </span>
      </h1>
      <h3
        className="text-red-600 text-lg hover:cursor-pointer p-2 rounded-lg hover:bg-red-600 hover:text-white mt-3"
        onClick={() => setCurrentChat(currcontacts[0])}
      >
        Start Messaging.
      </h3>
    </div>
  );
};

export default Welcome;
