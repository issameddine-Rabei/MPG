import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useAuth } from "context/authContext/authProvider";
import { useClients } from "context/clientsContext/clientsProvider";
import { useMachines } from "context/machinesContext/machinesProvider";
import { useProjects } from "context/projectsContext/projectsProvider";
import { useUsers } from "context/usersContext/usersProvider";
import React, { useEffect } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";

export const PrivateLayout = ({ children }) => {
  const { state: authstate } = useAuth();
  const { getAllClients } = useClients();
  const { getAllProjects } = useProjects();
  const { getAllUsers } = useUsers();
  const { getAllMachines } = useMachines();

  const navigate = useNavigate();
  useEffect(() => {
    if (!authstate.isAuthenticated) navigate("/login");
  });

  useEffect(() => {
    getAllUsers();
    getAllProjects();
    getAllClients();
    getAllMachines();
  }, []);

  return <div className="min-h-screen flex">{children}</div>;
};
