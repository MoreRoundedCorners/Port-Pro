import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchUser = async (token) => {
    // if (!token) return;
    try {
      const response = await fetch("/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
      console.error("no response", error);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      // store response to var labeled data
      const data = await response.json();

      if (response.status === 200) {
        console.log("Login successful, token:", data.token);
        localStorage.setItem("token", data.token);
        fetchUser(data.token);
        // save user's data
        const userResponse = await fetch("/api/users/" + data.id, {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        });
        const userData = await userResponse.json();
        setUser(userData);
        // Perform any additional actions after successful login, e.g., store the token and navigate to another page
        navigate("/");
      } else if (response.status === 401) {
        console.error("Error logging in user:", data.error);
        setErrorMessage(data.error);
        // Handle login error, e.g., show an error message to the user
        // You can use a state variable to show an error message in your component
      } else {
        console.error("Error logging in user:", data.error);

        // Handle login error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      // Handle login error, e.g., show an error message to the user
    }
  };

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="bg-slate-300">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="flex flex-col items-center p-2">
              <p className="text-center">Login</p>

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
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
          );
        }}
      </Formik>
    </div>
  );
};
