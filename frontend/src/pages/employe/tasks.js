import { Table } from "antd";
import { useAuth } from "context/authContext/authProvider";
import { useProjects } from "context/projectsContext/projectsProvider";
import React from "react";
import { VscDebugStart } from "react-icons/vsc";
import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_DOING,
  TASK_STATUS_READY,
} from "utils/constants";
import { useEffect, useState } from "react";

const Tasks = () => {
  const { getTasksByEmployee, setTaskInprogress, setTaskFinished } =
    useProjects();
  const { state: authState } = useAuth();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasksByEmployee(authState.user?._id).then((filteredTasks) => {
      setTasks(filteredTasks);
    });
  });

  /*function convertToDecimal(Duration) {
    const parts = Duration.split(" ");
    const hours = parseInt(parts[0].replace("h", ""));
    const minutes = parseInt(parts[1].replace("m", ""));
    return hours + minutes / 60;
  }*/

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
      render: (_, record) => (
        <div className="cursor-pointer">{record.machine.name}</div>
      ),
    },

    {
      title: "Projet",
      dataIndex: "project",
      key: "project",
      render: (_, record) => (
        <div className="cursor-pointer">{record.project.name}</div>
      ),
    },

    {
      title: "",
      dataIndex: "project",
      key: "project",
      render: (_, record) => (
        <div
          onClick={() => setTaskInprogress(record)}
          className="cursor-pointer bg-green-300 flex justify-center items-center space-x-2 text-lg first-letter text-white rounded-md p-2 py-1 font-bold hover:brightness-75"
        >
          <VscDebugStart size={20} />
          <span>Start</span>
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
      render: (_, record) => (
        <div className="cursor-pointer">{record.machine.name}</div>
      ),
    },

    {
      title: "Projet",
      dataIndex: "project",
      key: "project",
      render: (_, record) => (
        <div className="cursor-pointer">{record.project.name}</div>
      ),
    },

    {
      title: "",
      dataIndex: "project",
      key: "project",
      render: (_, record) => (
        <div
          onClick={() => setTaskFinished(record)}
          className="cursor-pointer bg-red-300 flex justify-center items-center space-x-2 text-lg first-letter text-white rounded-md p-2 py-1 font-bold hover:brightness-75"
        >
          <VscDebugStart size={20} />
          <span>End</span>
        </div>
      ),
    },
  ];

  const columns3 = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Machine",
      dataIndex: "machine",
      key: "machine",
      render: (_, record) => (
        <div className="cursor-pointer">{record.machine.name}</div>
      ),
    },

    {
      title: "Projet",
      dataIndex: "project",
      key: "project",
      render: (_, record) => (
        <div className="cursor-pointer">{record.project.name}</div>
      ),
    },
    {
      title: "Cost",
      key: "cost",
      render: (_, record) => {
        console.log(record.cost);
        return <div className="cursor-pointer">{`${record.cost} dt`}</div>;
      },
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto flex-col space-y-5 ">
      <div className="flex space-x-3 items-start ">
        <h2 className="bg-green-300 p-1 px-4 text-xs rounded-xl">
          Total Tasks : {tasks.length}
        </h2>
      </div>
      <div className="flex justify-between space-x-5">
        <div className="shadow-inner w-full  bg-slate-200 space-y-5 p-5 rounded-md">
          <h1 className="text-2xl font-semibold underline">To Do</h1>

          <Table
            dataSource={tasks.filter(
              (task) => task.state === TASK_STATUS_READY
            )}
            columns={columns}
          />
        </div>

        <div className="shadow-inner w-full  bg-slate-200 space-y-5 p-5 rounded-md">
          <h1 className="text-2xl font-semibold underline">In Progress</h1>

          <Table
            dataSource={tasks.filter(
              (task) => task.state === TASK_STATUS_DOING
            )}
            columns={columns2}
          />
        </div>
      </div>
      <div className="shadow-inner  bg-slate-200 space-y-5 p-5 rounded-md">
        <h1 className="text-2xl font-semibold underline">Completed</h1>

        <Table
          dataSource={tasks.filter(
            (task) => task.state === TASK_STATUS_COMPLETED
          )}
          columns={columns3}
        />
      </div>
      <br />
      <br />
    </div>
  );
};

export default Tasks;
