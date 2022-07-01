import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";

import {
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => {
    return state.custom;
  });

  const navigate = useNavigate();
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#">Blogs</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link>
                  <Link to="/">Login</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/signup">SignUp</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <div class="fluid">
          <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
              <Link to="#">BlogApp </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "150px" }}
                navbarScroll
              >
                <Nav.Link>
                  <Link to="/allblogs">All Blogs</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/myblogs">My Blogs</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/addblog">Add Blogs</Link>
                </Nav.Link>

                <Nav.Link
                  onClick={() => {
                    localStorage.clear();
                    // setAuth(null);
                    navigate("/");
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )}
    </>
  );
};

export default Header;
