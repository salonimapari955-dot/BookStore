import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Logout() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem("Users");
      sessionStorage.removeItem("postLoginRedirect");
      setAuthUser(undefined);
      toast.success("Logout successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Error:" + error.message);
    }
  };
  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
