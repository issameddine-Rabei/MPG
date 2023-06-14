import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import CreateUserForm from "components/forms/CreateUserForm";
import { useAuth } from "context/authContext/authProvider";
import { PrivateLayout } from "layouts/PrivateLayout";
import React, { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { ROLE_EMPLOYE, ROLE_MANAGER } from "utils/constants";
import { adminMenu } from "utils/sidebarMenus";

const AdminLayout = ({ children }) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user?.role === ROLE_EMPLOYE) navigate("/employe");
    else if (state.user?.role === ROLE_MANAGER) navigate("/manager");
  }, []);
  return (
    <PrivateLayout>
      <ProSidebarProvider>
        <Sidebar menu={adminMenu} />
      </ProSidebarProvider>
      <div className="flex-grow space-y-5">
        <Navbar />
        <Outlet />
      </div>
    </PrivateLayout>
  );
};

export default AdminLayout;
