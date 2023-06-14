import { useAuth } from "context/authContext/authProvider";
import React from "react";
import { HiUserCircle } from "react-icons/hi";
import { RiLogoutCircleFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  /*const serverUrl = "http://localhost:8000"; // Replace with your server URL
  const profileImgUrl = serverUrl + state.user.profileImg;*/

  const redirect = () => {
    switch (state.user.role) {
      case "Superadmin":
        navigate("/admin");
        break;
      case "Production Manager":
        navigate("/manager");
        break;
      case "Employee":
        navigate("/employe");
        break;
    }
  };

  return (
    <div className="bg-slate-800 text-white flex justify-between items-center py-2 px-8 ">
      <button
        className="flex items-center space-x-2"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" className="h-14 " />
        <div className="text-3xl font-extrabold">MPS</div>
      </button>
      <div className="flex space-x-5">
        {state.isAuthenticated === true && (
          <>
            <button
              className="flex space-x-1 items-center"
              onClick={() => redirect()}
            >
              <HiUserCircle size={25} />
              <div>{state.user?.username}</div>
            </button>
            <button
              className="flex space-x-1 items-center text-sm border border-white border-solid px-3 hover:brightness-90"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>
        )}

        {!state.isAuthenticated && (
          <Link to={"/login"}>
            <button className="flex space-x-1 items-center text-sm border border-white border-solid px-3 hover:brightness-90">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
