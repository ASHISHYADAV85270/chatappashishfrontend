import React, { useState } from "react";
import useravatar from "../assets/useravatar.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { logoutuserurl } from "../utils/routes";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "./Avatar";

const ContactFooter = ({ currentUserImage, currentUserName }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(true);
  };
  const handleClose = (event) => {
    setAnchorEl(false);
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.get(logoutuserurl, { withCredentials: true });
      toast.success(data.message);
      return navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex  gap-3 p-3 items-center h-[7vh]  border-t-slate-50 border-t-[0.4px]">
      <Avatar avatarImage={currentUserImage} />
      <h2 className=" uppercase">{currentUserName}</h2>
      <Button onClick={handleClick} size="small">
        <EditNoteOutlinedIcon sx={{ color: "#fff" }} />
      </Button>
      <Menu
        id="basic-menu"
        open={anchorEl ? true : false}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Change Avatar</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ContactFooter;
