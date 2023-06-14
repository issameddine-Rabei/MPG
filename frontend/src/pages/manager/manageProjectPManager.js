import { Table } from "antd";
import { useProjects } from "context/projectsContext/projectsProvider";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import CreateTaskForm from "components/forms/CreateTaskForm";
import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_DOING,
  TASK_STATUS_READY,
} from "utils/constants";

const ManageProjectPManager = () => {
  const {
    state: { projects },
  } = useProjects();

  const location = useLocation();
  function getLastPart(url) {
    const parts = url.split("/");
    return parts.at(-1);
  }

  const projectID = getLastPart(location.pathname);

  const project = projects?.filter((project) => project?._id === projectID)[0];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    // {
    //   title: "Machine",
    //   dataIndex: "machine",
    //   key: "mac",
    //   render: (_, record) => (
    //     <div className="cursor-pointer">{record.machine.name}</div>
    //   ),
    // },
  ];

  return (
    <div className="max-w-screen-xl mx-auto flex-col space-y-5 ">
      <CreateTaskForm projectID={projectID} />

      <div className="flex space-x-3 items-start ">
        <h1 className="text-slate-800 font-bold text-6xl">{project?.name}</h1>
        <h2 className="bg-green-300 p-1 px-4 text-xs rounded-xl">
          Total Tasks : {project?.chainOfTasks.length}
        </h2>
      </div>
      <div>
        Client: <span>{project?.client.name}</span>
      </div>

      <div className="shadow-inner  bg-slate-200 space-y-5 p-5 rounded-md">
        <h1 className="text-2xl font-semibold underline">To Do</h1>

        <Table
          dataSource={project?.chainOfTasks.filter(
            (task) => task.state === TASK_STATUS_READY
          )}
          columns={columns}
        />
      </div>

      <div className="shadow-inner  bg-slate-200 space-y-5 p-5 rounded-md">
        <h1 className="text-2xl font-semibold underline">In Progress</h1>

        <Table
          dataSource={project?.chainOfTasks.filter(
            (task) => task.state === TASK_STATUS_DOING
          )}
          columns={columns}
        />
      </div>
      <div className="shadow-inner  bg-slate-200 space-y-5 p-5 rounded-md">
        <h1 className="text-2xl font-semibold underline">Completed</h1>

        <Table
          dataSource={project?.chainOfTasks.filter(
            (task) => task.state === TASK_STATUS_COMPLETED
          )}
          columns={columns}
        />
      </div>
      <br />
      <br />
    </div>
  );
};
export default ManageProjectPManager;
