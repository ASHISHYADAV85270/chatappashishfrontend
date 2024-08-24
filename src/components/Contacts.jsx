import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import ContactFooter from "./ContactFooter";
import useravatar from "../assets/useravatar.png";
import Avatar from "./Avatar.jsx";

const Contacts = ({ currcontacts, currentUser, setCurrentChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(0);
  const [loading, setLoading] = useState(false);

  /********to fetch data of the chats of the user */
  useEffect(() => {
    setCurrentUserName(currentUser?.username);
    setCurrentUserImage(currentUser?.avataImage);
  }, [currentUser]);

  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="h-full ">
          <div className="h-[7vh] box-border brand flex flex-row items-center justify-center gap-[0.5rem] border-b-slate-50 border-b-[0.4px]">
            <img src={logo} alt="logo" className="h-9" />
            <h3 className="uppercase text-c3">snappy</h3>
          </div>

          <div className="contacts flex flex-col items-center overflow-auto py-5 gap-[0.4rem]  justify-start h-[86vh]">
            {currcontacts?.map((contact, index) => {
              return (
                <div
                  className={`flex flex-row items-center gap-[1rem] h-12 bg-[#1F1F1F] cursor-pointer w-[95%] p-[0.4rem] transition duration-500 ease-in-out rounded-3xl
            ${
              index === currentSelected
                ? " border-slate-50 border-[0.4px] text-[#fff] shadow-2xl bg-white"
                : "hover:border-slate-300 hover:border-[0.4px] hover:bg-slate-800 hover:opacity-75 "
            }
          `}
                  key={index}
                  onClick={() => {
                    setCurrentSelected(index);
                    setCurrentChat(contact);
                  }}
                >
                  <Avatar avatarImage={contact?.avataImage} />

                  <h3
                    className={`text-lg uppercase text-[#C8C8C8] flex ${
                      index == currentSelected ? "translate-x-2 text-black" : ""
                    } `}
                  >
                    {contact?.username}
                    {index === currentSelected ? (
                      <span className="text-[6px] ml-1">🟢</span>
                    ) : null}
                  </h3>
                </div>
              );
            })}
          </div>
          <ContactFooter
            currentUserImage={currentUserImage}
            currentUserName={currentUserName}
          />
        </div>
      )}
    </>
  );
};

export default Contacts;
