import React, { useState } from "react";
import * as Yup from "yup";

import { FaUserPlus } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { useClients } from "context/clientsContext/clientsProvider";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email().required("Required"),
});

export const CreateClientForm = () => {
  const { createClient } = useClients();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const className = isModalOpen
    ? "absolute bg-black/30 inset-0 z-40 flex justify-center items-center"
    : "hidden";

  return (
    <>
      <div className="flex justify-end">
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-green-300 p-2 px-5 rounded-md flex space-x-2 items-center"
        >
          <FaUserPlus size={30} />
          <h1 className="text-black">Add client</h1>
        </div>
      </div>

      <div className={className}>
        <h1 className="text-black">Add client</h1>
        <Formik
          initialValues={{
            username: "",
            name: "",
            phone: "",
            email: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            createClient(values);
            setIsModalOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="p-20 z-50  bg-white rounded-md border-solid border-black border-2 shadow-md 
            flex flex-col space-y-5"
            >
              <span>Add client</span>

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
                name="phone"
                type="phone"
                placeholder="phone"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.phone && touched.phone ? (
                <div className="text-red-500">{errors.phone}</div>
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
export default CreateClientForm;
