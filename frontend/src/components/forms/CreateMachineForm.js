import React, { useState } from "react";
import * as Yup from "yup";

import { FaUserPlus } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { useClients } from "context/clientsContext/clientsProvider";
import { useMachines } from "context/machinesContext/machinesProvider";
import { MACHINE_STATUS } from "utils/constants";

const SignupSchema = Yup.object().shape({
  state: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  costPerHour: Yup.string().required("Required"),
});

export const CreateMachineForm = () => {
  const { createMachine } = useMachines();

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
          <h1 className="text-black">Add machine</h1>
        </div>
      </div>

      <div className={className}>
        <h1 className="text-black">Add machine</h1>
        <Formik
          initialValues={{
            name: "",
            costPerHour: "",
            state: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            createMachine(values);
            setIsModalOpen(false);
          }}
        >
          {({ errors, touched }) => (
            <Form
              className="p-20 z-50  bg-white rounded-md border-solid border-black border-2 shadow-md 
            flex flex-col space-y-5"
            >
              <span>Add machine</span>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
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
                  Cost per hour
                </label>

                <Field
                  name="costPerHour"
                  type="costPerHour"
                  placeholder="costPerHour"
                  className="bg-gray-200 p-2 border-solid border-black rounded-md"
                />
                {errors.costPerHour && touched.costPerHour ? (
                  <div className="text-red-500">{errors.costPerHour}</div>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status
                </label>
                <Field
                  as="select"
                  name="state"
                  placeholder="state"
                  className="bg-gray-200 p-2 border-solid border-black rounded-md"
                >
                  <option value="">Select a status</option>

                  {MACHINE_STATUS.map((item, _) => (
                    <option key={_}>{item}</option>
                  ))}
                </Field>
                {errors.state && touched.state ? (
                  <div className="text-red-500">{errors.state}</div>
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
export default CreateMachineForm;
