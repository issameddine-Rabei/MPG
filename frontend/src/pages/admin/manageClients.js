import { Table } from "antd";
import CreateClientForm from "components/forms/CreateClientForm";
import UpdateClientForm from "components/forms/UpdateClientForm";
import { useClients } from "context/clientsContext/clientsProvider";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import * as moment from "moment";

const ManageClients = () => {
  const { state, getAllClients, deletClient } = useClients();
  useEffect(() => {
    getAllClients();
  }, []);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
          <UpdateClientForm user={record} />
          <div onClick={() => deletClient(record?._id)}>
            <AiFillDelete size={25} className="text-red-500" />
            Delete
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col space-y-5">
      <CreateClientForm />
      <Table dataSource={state?.clients} columns={columns} />
    </div>
  );
};

export default ManageClients;
