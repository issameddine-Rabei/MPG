import { Table, Tag } from "antd";
import CreateProjectForm from "components/forms/CreateProjectForm";
import UpdateClientForm from "components/forms/UpdateClientForm";
import { useProjects } from "context/projectsContext/projectsProvider";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import * as moment from "moment";

const ManageProjects = () => {
  const { deletProject, state } = useProjects();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Manager",
      dataIndex: "productionManager",
      key: "productionManager",
      render: (_, record) => <div>{record.productionManager?.name}</div>,
    },

    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      render: (_, record) => <div>{record.client?.name}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <Tag key={_}>{record?.status}</Tag>,
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => {
        const date = moment("2023-06-05T17:11:45.158Z");
        const formattedDate = date.format("DD/MM/YY");
        return formattedDate;
      },
    },

    {
      title: "Action",
      dataIndex: "action",

      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <UpdateClientForm user={record} />
          <div onClick={() => deletProject(record?._id)}>
            <AiFillDelete size={25} className="text-red-500" />
            Delete
          </div>
        </div>
      ),
    },
  ];

  console.log(state);
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col space-y-5">
      <CreateProjectForm />
      <Table dataSource={state?.projects} columns={columns} />
    </div>
  );
};

export default ManageProjects;
