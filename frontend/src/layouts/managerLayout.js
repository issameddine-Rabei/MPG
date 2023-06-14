import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useAuth } from "context/authContext/authProvider";
import { PrivateLayout } from "layouts/PrivateLayout";
import React, { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { ROLE_EMPLOYE, ROLE_SUPER_ADMIN } from "utils/constants";
import { managerMenu } from "utils/sidebarMenus";

const ManagerLayout = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user?.role === ROLE_SUPER_ADMIN) navigate("/admin");
    else if (state.user?.role === ROLE_EMPLOYE) navigate("/employe");
  }, []);

  return (
    <>
      <PrivateLayout>
        <ProSidebarProvider>
          <Sidebar menu={managerMenu} />
        </ProSidebarProvider>

        <div className=" flex-grow space-y-5">
          <Navbar />

          <Outlet />
        </div>
      </PrivateLayout>
      <Footer isLanding={false} />
    </>
  );
};

export default ManagerLayout;
