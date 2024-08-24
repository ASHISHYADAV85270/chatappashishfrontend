import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import loader from "../assets/loader.gif";
import { Buffer } from "buffer";
import { setProfilePictureurl, checkauthurl } from "../utils/routes";
import { baseAvatarUrl, randomAvatars } from "../utils/avatarList";

function SetAvatar() {
  const api_route_for_images = "https://api.multiavatar.com/54433"; //for getting random images
  const navigate = useNavigate();

  // for setting avatar
  const [avatars, setAvatars] = useState(randomAvatars);
  console.log(randomAvatars);

  const [loading, setLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    setLoading(true);
    try {
      if (selectedAvatar === undefined) {
        toast.error("Please Select a Avatar");
        return;
      }
      const data = await axios.post(
        setProfilePictureurl,
        { image: avatars[selectedAvatar] },
        { withCredentials: true } //to excess token and send token data to backend
      );
      if (data.data.success) {
        toast.success(data.data.message);
        navigate("/");
      } else {
        toast.error(data.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error("error in the setavatar calling");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  /* for checking user is there or not*/

  const [currentUser, setCurruser] = useState(undefined);
  useEffect(() => {
    const checkauth = async () => {
      const data = await axios.post(
        checkauthurl,
        {},
        { withCredentials: true }
      );
      if (data.data.success) {
        setCurruser(data.data.user);
      } else {
        toast.error("Login First");
        navigate("/login");
      }
    };
    checkauth();
  }, []);
  /**** */

  return (
    <div className=" h-[100vh] bg-c1 flex flex-col items-center justify-center gap-9 w-[100vw]">
      {loading ? (
        <img src={loader} alt="loader" className="loader" />
      ) : (
        <>
          <h1 className="text-4xl font-bold  text-c3">
            Pick an avatar as your profile picture
          </h1>
          <div className="flex justify-center items-center gap-20 h-[120px] font-bold text-c3">
            {loading ? "Please Refersh Avatar not Fetched" : ""}
            {avatars.map((curr_url, index) => {
              return (
                <div
                  className={` overflow-hidden rounded-full ${
                    selectedAvatar === index
                      ? " border-[#4e0eff] border-[0.4rem]  "
                      : ""
                  }`}
                  id={index}
                >
                  <img
                    src={curr_url}
                    alt="avatar"
                    key={index}
                    onClick={() => setSelectedAvatar(index)}
                    className="h-[6rem] ease-in-out  cursor-pointer"
                  />
                </div>
              );
            })}
          </div>
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/4 h-14 rounded-md  p-[1px]">
            <div className="flex  items-center  text-2xl  justify-center font-semibold bg-c1 h-full rounded-md gap-3">
              <button
                onClick={setProfilePicture}
                className={`${
                  loading ? "cursor-not-allowed " : "cursor-pointer"
                }`}
                disabled={loading}
              >
                Set Avatar
              </button>
            </div>
          </div>
        </>
      )}

      <Toaster />
    </div>
  );
}

export default SetAvatar;
