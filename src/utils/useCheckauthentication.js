import axios from "axios";
import { useEffect, useState } from "react";
import { checkauthurl } from "./routes";
import { useNavigate } from "react-router-dom";


const useCheckauthentication = () => {
    const navigate=useNavigate();
  const [currUser, setcurrUser] = useState(undefined);
  useEffect(() => {
    checkauth();
  }, []);
    async function checkauth() {
      try {
        const data = await axios.post(
          checkauthurl,
          {},
          { withCredentials: true }
        );
        if (data.data.success) {
          const username = data?.data?.user?.username;
          setcurrUser(data.data.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log("error from chat.jsx");
      } finally {
      }
    }

    return currUser;
};

export default useCheckauthentication;
