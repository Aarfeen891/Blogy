import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { signupUser } from "../reducer/login&Reg";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const SignUp = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [cpassword, setCpassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.custom;
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter your Name"),
      email: Yup.string()
        .email("invalid Email format")
        .required("Please Enter your Email"),
      password: Yup.string()
        .min(3, "Minimum 3 Characters")
        .max(8, "Maximum 8 Characters")
        .required("Please Enter Password"),
      cpassword: Yup.string()
        .min(3, "Minimum 3 Characters")
        .max(8, "Maximum 8 Characters")
        .required("Please Confirm your Password"),
    }),
  });

  const { name, email, password, cpassword } = formik.values;
  const submithan = async (e) => {
    e.preventDefault();

    const app = await dispatch(
      signupUser({ name, email, password, cpassword })
    );
    if (app.payload.data) {
      localStorage.setItem("userInfo", JSON.stringify(app.payload.data));
      localStorage.setItem("token", JSON.stringify(app.payload.data.token));
      localStorage.setItem("id", JSON.stringify(app.payload.data._id));

      toast.success(app.payload.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
      });

      // setTimeout(() => {
      //   navigate("/allblogs");
      // }, 2100);
    }
    if (app.payload.response.data) {
      toast.error(app.payload.response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
      });
      const user = app.payload.response.data.message.split(":");
      console.log(user);
      const userError = user[3].split(",");
      console.log(userError[0]);
    }
  };
  // if (user.signupdata) {
  //   localStorage.setItem("userInfo", JSON.stringify(user.signupdata));
  //   localStorage.setItem("token", user.signupdata.token);
  //   toast.success(user.signupdata.message);
  // }
  console.log(formik.values);

  const call = (e) => {
    submithan(e);
    formik.handleSubmit();
  };
  return (
    <div
      className="container "
      style={{
        width: "400px",
        marginTop: "70px",
        border: "1px solid black",
        borderRadius: "5px",
      }}
    >
      {/* {user.signupdata && <h1>{user.signupdata.message}</h1>} */}

      <h1 style={{ textAlign: "center", marginTop: "15px" }}>SignUp </h1>
      <Form style={{ marginTop: "20px", marginBottom: "20px" }} onSubmit={call}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.name}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Conform Password</Form.Label>
          <Form.Control
            type="Enter Password"
            placeholder="Enter Confirm-Password"
            name="cpassword"
            value={formik.values.cpassword}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.cpassword}</p>
        </Form.Group>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Button variant="primary" type="submit">
            Register
          </Button>
          <br></br>
          <Link to="/">Already have an Account ?</Link>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
