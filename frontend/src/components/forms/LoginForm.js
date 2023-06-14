import React from "react";
import * as Yup from "yup";
import { useAuth } from "context/authContext/authProvider";
import { Field, Form, Formik } from "formik";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required to login"),
  password: Yup.string().required("Password is required to login"),
});
const LoginForm = () => {
  const { login } = useAuth();

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4 md:space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your username
            </label>
            <Field
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
              placeholder="username"
            />
            {errors.username && touched.username ? (
              <div className="text-red-500">{errors.username}</div>
            ) : null}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            />
            {errors.password && touched.password ? (
              <div className="text-red-500">{errors.password}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full text-white bg-slate-600 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
          >
            Sign in
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
