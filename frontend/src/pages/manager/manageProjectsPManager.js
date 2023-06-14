import { Table } from "antd";
import CreateClientForm from "components/forms/CreateClientForm";
import { useAuth } from "context/authContext/authProvider";
import { useProjects } from "context/projectsContext/projectsProvider";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const ManageProjectsPManager = () => {
  const { getProjectsByManager } = useProjects();
  const { state: authState } = useAuth();

  const projects = getProjectsByManager(authState.user?._id);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link
          to={`/manager/projects/${record?._id}`}
          onClick={() => console.log("first")}
        >
          <div className="cursor-pointer">view</div>
        </Link>
      ),
    },
  ];
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col space-y-5">
      <div className="flex  space-x-2">
        <h1 className="text-slate-800 font-bold text-xl">List of Projects</h1>
        <span className="h-6 w-6 flex justify-center items-center rounded-full bg-green-300 ">
          {projects.length}
        </span>
      </div>
      <Table dataSource={projects} columns={columns} />
    </div>
  );
};
export default ManageProjectsPManager;
