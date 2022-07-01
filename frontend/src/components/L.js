import React, { useState, useEffect } from "react";
import { loginUser } from "../reducer/login&Reg";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  const user = useSelector((state) => {
    return state.custom;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const onSubmit = (data) => {
  //   console.log(data);

  // };
  // onSubmit Functionality
  const submithan = async (e) => {
    e.preventDefault();

    const app = await dispatch(loginUser({ email, password }));
    console.log(app);
    if (app.payload.data) {
      localStorage.setItem("userInfo", JSON.stringify(app.payload.data));
      localStorage.setItem("token", JSON.stringify(app.payload.data.token));
      localStorage.setItem("id", JSON.stringify(app.payload.data._id));
      setMessage(app.payload.data.message);
      navigate("/allblogs");
    }
    if (app.payload.response.data) {
      setError(app.payload.response.data.message);
    }
  };
  // console.log(user.logindata.message);

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
      {/* <div className="alert alert-danger">{message || error}</div> */}
      <h1 style={{ textAlign: "center", marginTop: "15px" }}>Login </h1>
      <Form onSubmit={submithan}>
        <Form.Group className="mb-4">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            name="email"
            // {...register("email", { required: "Please Enter Email" })}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* <error style={{ color: "red" }}>{errors.email?.message}</error> */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            // {...register("password", {
            //   required: true,
            //   minLength: 3,
            //   maxLength: 8,
            // })}
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {/* <error style={{ color: "red" }}>
            {errors.password?.type === "required" && "please Enter Password"}
            {errors.password?.type === "minLength" && "min length is 3 "}
            {errors.password?.type === "maxLength" && " max Length is 8"}
          </error> */}
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
    </div>
  );
};

export default LoginPage;
