import React, { useState, useEffect } from "react";
import { loginUser } from "../reducer/login&Reg";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  ///// Formik

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      message: "",
      error: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("invalid Email format")
        .required("Required Email"),

      password: Yup.string()
        .min(3, "minimum 3 characters ")
        .max(8, "maximum 8 characters")
        .required("Required Password"),
    }),

    onSubmit: (values) => {
      console.log("form submitted", values);
    },
  });

  console.log(formik.errors);

  const { email, password, message, error } = formik.values;

  console.log(formik.values);

  ///// useSelector
  const user = useSelector((state) => {
    return state.custom;
  });

  ///// submitHandler

  const submithan = async (e) => {
    e.preventDefault();

    const app = await dispatch(loginUser({ email, password }));
    console.log(app);
    if (app.payload.data) {
      localStorage.setItem("userInfo", JSON.stringify(app.payload.data));
      localStorage.setItem("token", JSON.stringify(app.payload.data.token));
      localStorage.setItem("id", JSON.stringify(app.payload.data._id));

      // formik.values.message = app.payload.data.message;
      // formik.values.error = "";
      // console.log(`Kooooooon ${formik.values.message}`);
      toast.success(app.payload.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
      });

      setTimeout(() => {
        navigate("/allblogs");
      }, 2100);
    }
    if (app.payload.response.data) {
      // formik.values.error = app.payload.response.data.message;
      // formik.values.message = "";

      toast.error(app.payload.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
    }
  };

  const call = (e) => {
    submithan(e);
    formik.handleSubmit();
  };
  return (
    <div
      className="container  "
      style={{
        width: "400px",
        margin: "35%",
        marginTop: "80px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Login </h1>
      <Form onSubmit={call}>
        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        </Form.Group>

        <Button
          style={{ marginBottom: "10px" }}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
        <br></br>
        <Link to="/signup">Create New Account</Link>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
