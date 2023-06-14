import { Table } from "antd";
import CreateUserForm from "components/forms/CreateUserForm";
import { UpdateUserForm } from "components/forms/UpdateUserForm";
import { useUsers } from "context/usersContext/usersProvider";
import React, { useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { ROLE_EMPLOYE, ROLE_MANAGER } from "utils/constants";
import * as moment from "moment";

const ManagePManager = () => {
  const { state, deletUser } = useUsers();

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
      title: "Role",
      dataIndex: "role",
      key: "role",
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
          <UpdateUserForm user={record} />
          <div onClick={() => deletUser(record._id)}>
            <AiFillDelete size={25} className="text-red-500" />
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto flex flex-col space-y-5">
      <CreateUserForm role={ROLE_MANAGER} />
      <Table
        dataSource={state.users.filter((user) => {
          return user.role === ROLE_MANAGER;
        })}
        columns={columns}
      />
    </div>
  );
};

export default ManagePManager;
