import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoMdConstruct } from "react-icons/io";
import { HiBriefcase } from "react-icons/hi";

export const adminMenu = [
  {
    text: "Dashboard",
    url: "/admin",
    icon: RiDashboard2Fill,
  },

  {
    text: "Machines",
    url: "/admin/machines",
    icon: IoMdConstruct,
  },

  {
    text: "Projects",
    url: "/admin/projects",
    icon: AiOutlineFundProjectionScreen,
  },

  {
    text: "Employes",
    url: "/admin/employes",
    icon: FaUsers,
  },

  {
    text: "Clients",
    url: "/admin/clients",
    icon: FaHandshake,
  },

  {
    text: "Managers",
    url: "/admin/managers",
    icon: HiBriefcase,
  },
];

export const managerMenu = [
  {
    text: "Dashboard",
    url: "/manager",
    icon: RiDashboard2Fill,
  },
  {
    text: "Projects",
    url: "/manager/projects",
    icon: HiBriefcase,
  },
];

export const employeeMenu = [
  {
    text: "Dashboard",
    url: "/manager",
    icon: RiDashboard2Fill,
  },
  {
    text: "Tasks",
    url: "/employe/tasks",
    icon: HiBriefcase,
  },
];
