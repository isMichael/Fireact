import axios from "axios";
import React, { Fragment } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { Messaging, registerToken } from "./Messaging";
import { requestFirebaseNotificationPermission } from "./firebaseInit";

axios.defaults.baseURL = "https://chat-mb.herokuapp.com/v1";

const App = () => {
  const [token, setToken] = React.useState("");

  React.useEffect(async () => {
    try {
      const firebaseToken = await requestFirebaseNotificationPermission();
      setToken(firebaseToken);
      console.log(firebaseToken);
      await registerToken(firebaseToken);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Fragment>
      <ToastContainer autoClose={2000} position="top-center" />
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">
          Firebase notifictations with React and Express
        </Navbar.Brand>
      </Navbar>

      <Container className="center-column">
        <Row>
          <Col>
            <Messaging token={token} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default App;
