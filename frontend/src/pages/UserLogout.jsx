import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      header: {
        Authorization: `Bearer: ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    });

  return <div>User Logout</div>;
}

export default UserLogout;
