import ManageProjects from "pages/admin/manageProjects";
import ManageClients from "pages/admin/manageClients";
import ManageEmploye from "pages/admin/manageEmployes";
import ManageMachines from "pages/admin/manageMachines";
import Landing from "pages/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "layouts/adminLayout";
import ManagerLayout from "layouts/managerLayout";
import EmployeLayout from "layouts/employeLayout";
import DashboardAdmin from "pages/admin/dashboardAdmin";
import Login from "pages/login";
import ManagePManager from "pages/admin/managePManager";
import ManagerDashboard from "pages/manager/managerDashboard";
import ManageProjectsPManager from "pages/manager/manageProjectsPManager";
import ManageProjectPManager from "pages/manager/manageProjectPManager";
import DashboardEmploye from "pages/employe/dashboardEmploye";
import Tasks from "pages/employe/tasks";

function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
          <Route index element={<Landing />} />

          <Route path="admin" element={<AdminLayout />}>
            <Route path="" element={<DashboardAdmin />} />
            <Route path="clients" element={<ManageClients />} />
            <Route path="projects" element={<ManageProjects />} />
            <Route path="machines" element={<ManageMachines />} />
            <Route path="employes" element={<ManageEmploye />} />
            <Route path="managers" element={<ManagePManager />} />
          </Route>

          <Route path="manager" element={<ManagerLayout />}>
            <Route path="" element={<ManagerDashboard />} />
            <Route path="projects" element={<ManageProjectsPManager />} />
            <Route path="projects/:id" element={<ManageProjectPManager />} />
          </Route>
          <Route path="employe" element={<EmployeLayout />}>
            <Route path="" element={<DashboardEmploye />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
