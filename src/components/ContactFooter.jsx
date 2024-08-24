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
      <img
        src={
          currentUserImage
            ? `data:image/svg+xml;base64,${currentUserImage}`
            : useravatar
        }
        alt="User avatar"
        className="h-9 rounded-full"
      />

      <h2 className=" uppercase">{currentUserName}</h2>

      <Button onClick={handleClick} size="small">
        <EditNoteOutlinedIcon sx={{ color: "#fff" }} />
      </Button>
      <Menu id="basic-menu" open={anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Change Avatar</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ContactFooter;
