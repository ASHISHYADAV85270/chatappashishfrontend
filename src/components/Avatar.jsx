import React from "react";
import useravatar from "../assets/useravatar.png";
const Avatar = ({ avatarImage }) => {
  return (
    <img
      src={avatarImage ? `${avatarImage}` : useravatar}
      alt="User avatar"
      className="h-9 rounded-full"
    />
  );
};

export default Avatar;
