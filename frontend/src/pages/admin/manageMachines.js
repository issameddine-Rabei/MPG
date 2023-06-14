import { Table, Tag } from "antd";
import CreateMachineForm from "components/forms/CreateMachineForm";
import UpdateMachineForm from "components/forms/UpdateMachineForm";
import { useMachines } from "context/machinesContext/machinesProvider";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import * as moment from "moment";

const ManageMachines = () => {
  const { state, deleteMachine } = useMachines();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (_, record) => <Tag>{record.state}</Tag>,
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
      key: "action",
      render: (_, record) => (
        <div className="flex space-x-2">
          <UpdateMachineForm user={record} />
          <div onClick={() => deleteMachine(record._id)}>
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
      <CreateMachineForm />
      <Table dataSource={state.machines} columns={columns} />
    </div>
  );
};

export default ManageMachines;
