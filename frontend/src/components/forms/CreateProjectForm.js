import React, { useState } from "react";
import * as Yup from "yup";

import { FaUserPlus } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { useProjects } from "context/projectsContext/projectsProvider";
import { useClients } from "context/clientsContext/clientsProvider";
import { useUsers } from "context/usersContext/usersProvider";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // notes: Yup.string(),
  client: Yup.string().required(),
  productionManager: Yup.string().required(),
});

export const CreateProjectForm = () => {
  const { createProject } = useProjects();
  const { state: stateClients } = useClients();
  const { getManagers } = useUsers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const className = isModalOpen
    ? "absolute bg-black/30 inset-0 z-40 flex justify-center items-center"
    : "hidden";

  const managers = getManagers();
  return (
    <>
      <div className="flex justify-end">
        <div
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer bg-green-300 p-2 px-5 rounded-md flex space-x-2 items-center"
        >
          <FaUserPlus size={30} />
          <h1 className="text-black">Add project</h1>
        </div>
      </div>

      <div className={className}>
        <Formik
          initialValues={{
            name: "",
            notes: "",
            client: "",
            productionManager: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            createProject(values);
            setIsModalOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="p-20 z-50  bg-white rounded-md border-solid border-black border-2 shadow-md 
            flex flex-col space-y-5"
            >
              <h1 className="text-black">Add project</h1>

              <Field
                name="name"
                placeholder="name"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              />
              {errors.name && touched.name ? (
                <div className="text-red-500">{errors.name}</div>
              ) : null}

              <Field
                as="select"
                name="client"
                placeholder="client"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              >
                <option value="">Select a client</option>
                {stateClients.clients?.map((item, _) => (
                  <option key={_} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              {errors.client && touched.client ? (
                <div className="text-red-500">{errors.client}</div>
              ) : null}

              <Field
                as="select"
                name="productionManager"
                placeholder="productionManager"
                className="bg-gray-200 p-2 border-solid border-black rounded-md"
              >
                <option value="">Select a manager</option>

                {managers?.map((item, _) => (
                  <option key={_} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Field>
              {errors.productionManager && touched.productionManager ? (
                <div className="text-red-500">{errors.productionManager}</div>
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
export default CreateProjectForm;
