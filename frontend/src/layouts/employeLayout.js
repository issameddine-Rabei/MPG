import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useAuth } from "context/authContext/authProvider";
import { PrivateLayout } from "layouts/PrivateLayout";
import React, { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { ROLE_MANAGER, ROLE_SUPER_ADMIN } from "utils/constants";
import { employeeMenu } from "utils/sidebarMenus";

const EmployeLayout = () => {
  const { state } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (state.user?.role === ROLE_SUPER_ADMIN) navigate("/admin");
    else if (state.user?.role === ROLE_MANAGER) navigate("/manager");
  }, []);

  return (
    <PrivateLayout>
      <ProSidebarProvider>
        <Sidebar menu={employeeMenu} />
      </ProSidebarProvider>

      <div className=" flex-grow space-y-5">
        <Navbar />
        <Outlet />
      </div>
    </PrivateLayout>
  );
};

export default EmployeLayout;
