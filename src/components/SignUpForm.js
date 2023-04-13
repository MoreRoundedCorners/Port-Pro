import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpForm = ({ setUser }) => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      // Perform any additional actions after successful registration, e.g., navigate to another page
      setUser(data);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle registration error, e.g., show an error message to the user
    }
  };

  return (
    <div className="bg-slate-300">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col items-center p-2">
            <p className="text-center">Register</p>
            <div className="flex">
              <label className="p-2 ">
                Username:
                <Field type="text" name="name" />
                <ErrorMessage name="name" />
              </label>
            </div>
            <div className="flex">
              <label className="p-2">
                Email:
                <Field type="email" name="email" />
                <ErrorMessage name="email" />
              </label>
            </div>
            <div className="flex">
              <label className="p-2">
                Password:
                <Field type="password" name="password" />
                <ErrorMessage name="password" />
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-center py-2 px-4"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
