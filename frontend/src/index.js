import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "context/authContext/authProvider";
import UsersProvider from "context/usersContext/usersProvider";
import App from "App";
import ClientsProvider from "context/clientsContext/clientsProvider";
import ProjectsProvider from "context/projectsContext/projectsProvider";
import MachinesProvider from "context/machinesContext/machinesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <UsersProvider>
      <ClientsProvider>
        <ProjectsProvider>
          <MachinesProvider>
            <App />
          </MachinesProvider>
        </ProjectsProvider>
      </ClientsProvider>
    </UsersProvider>
  </AuthProvider>
);
