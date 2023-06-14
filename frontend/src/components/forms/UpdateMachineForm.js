import React, { useState } from "react";
import * as Yup from "yup";
import { useUsers } from "context/usersContext/usersProvider";

import { FaUserPlus } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { AiFillEdit } from "react-icons/ai";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  email: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export const UpdateMachineForm = ({
  user: { username, password, name, email, _id },
}) => {
  const { updateUser } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const className = isModalOpen
    ? "fixed bg-black/30 inset-0 -left-16 z-40 flex justify-center items-center"
    : "hidden";

  return (
    <>
      <div
        className="flex flex-col justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <AiFillEdit size={25} className="text-green-500" />
        <h1 className="text-black">Update</h1>
      </div>

      <div className={className}>
        <h1 className="text-black">Update user</h1>
        <Formik
          initialValues={{
            username,
            name,
            password: "",
            email,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            const { password, ...rest } = values;
            updateUser({
              ...rest,
              ...(values.password !== "" && { password: values.password }),
              _id,
            });
            setIsModalOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="p-20 z-50  bg-white rounded-md border-solid border-black border-2 shadow-md 
            flex flex-col space-y-5"
            >
              <div>Update user</div>
              <Field
                name="username"
                placeholder="username"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.username && touched.username ? (
                <div className="text-red-500">{errors.username}</div>
              ) : null}

              <Field
                name="name"
                placeholder="name"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500">{errors.name}</div>
              ) : null}

              <Field
                name="password"
                type="password"
                placeholder="password"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500">{errors.password}</div>
              ) : null}

              <Field
                name="email"
                placeholder="email"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.email && touched.email ? (
                <div className="text-red-500">{errors.email}</div>
              ) : null}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-300 p-2 px-4 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="flex-1 bg-red-300 p-2 px-4 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  {" "}
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
export default UpdateMachineForm;
