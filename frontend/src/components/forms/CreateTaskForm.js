import React, { useState } from "react";
import * as Yup from "yup";

import { BiTask } from "react-icons/bi";
import { Field, Form, Formik } from "formik";
import { useClients } from "context/clientsContext/clientsProvider";
import { useMachines } from "context/machinesContext/machinesProvider";
import { useUsers } from "context/usersContext/usersProvider";
import { ROLE_EMPLOYE } from "utils/constants";
import { useProjects } from "context/projectsContext/projectsProvider";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  employee: Yup.string().required("Required"),
  machine: Yup.string().required("Required"),
});

export const CreateTaskForm = ({ projectID }) => {
  const {
    state: { machines },
  } = useMachines();

  const {
    state: { users },
    getEmployees,
  } = useUsers();

  const { addTask } = useProjects();
  const employees = getEmployees();

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
          <BiTask size={30} />
          <h1 className="text-black">Add task</h1>
        </div>
      </div>

      <div className={className}>
        <h1 className="text-black">Add task</h1>
        <Formik
          initialValues={{
            name: "",
            machine: "",
            employee: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            addTask({ ...values, project: projectID });
            setIsModalOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="p-20 z-50  bg-white rounded-md border-solid border-black border-2 shadow-md 
            flex flex-col space-y-5"
            >
              <span>Add Task</span>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Task Name
                </label>
                <Field
                  name="name"
                  placeholder="name"
                  className="bg-gray-200 p-2 border-solid border-black rounded-md"
                />
                {errors.name && touched.name ? (
                  <div className="text-red-500">{errors.name}</div>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Machine
                </label>
                <Field
                  as="select"
                  name="machine"
                  placeholder="machine"
                  className="bg-gray-200 p-2 border-solid border-black rounded-md w-full"
                >
                  <option value="">Select an machine</option>

                  {machines?.map((item, _) => (
                    <option key={_} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
              </div>
              {errors.machine && touched.machine ? (
                <div className="text-red-500">{errors.machine}</div>
              ) : null}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employe
                </label>

                <Field
                  as="select"
                  name="employee"
                  placeholder="employee"
                  className="bg-gray-200 p-2 border-solid border-black rounded-md w-full"
                >
                  <option value="">Select an employee</option>
                  {employees?.map((item, _) => (
                    <option key={_} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Field>
                {errors.employee && touched.employee ? (
                  <div className="text-red-500">{errors.employee}</div>
                ) : null}
              </div>

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
export default CreateTaskForm;
