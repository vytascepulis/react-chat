import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import GoogleLogin from "react-google-login";
import UserContext from "../user-context";

// Import components
import UserInfo from "../components/UserInfo";
import LoggedInUsers from "../components/LoggedInUsers";
import ChatBox from "../components/ChatBox";

// Import firebase config
import { fire } from "../firebase";

const Main = (props) => {
  const user = useContext(UserContext);
  const { handleUserObj } = props;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const loggedIn = fire.database().ref("loggedIn");
  const messagesFetch = fire.database().ref("messages");

  const handleMessage = (message) => {
    let { name, imageUrl } = user;
    let lastId = messagesFetch.push().key;
    messagesFetch
      .child(lastId)
      .set({ name: name, message: message, imageUrl: imageUrl });
  };

  // get logged in users
  useEffect(() => {
    loggedIn.on("value", (el) => {
      if (el.val()) {
        const fetchUsers = Object.values(el.val());
        setUsers(fetchUsers);
      }
    });
  }, []);

  // get messages
  useEffect(() => {
    messagesFetch.on("value", (el) => {
      let allMessages = [];
      if (el.val()) {
        const entries = Object.entries(el.val());

        entries.forEach((el) => {
          allMessages.unshift({
            name: el[1].name,
            message: el[1].message,
            imageUrl: el[1].imageUrl,
          });
        });
      }
      setMessages(allMessages, ...messages);
    });
  }, []);

  return (
    <Container>
      <Row>
        {user ? (
          <Col xs={12} className="px-0 px-sm-3 mt-0 mt-sm-4">
            <Card className="shadow">
              <CardBody>
                <Row>
                  <Col xs={12} md={3} className="border-right">
                    <UserInfo handleUserObj={handleUserObj} user={user} />
                    <LoggedInUsers users={users} />
                  </Col>
                  <Col xs={12} md={9}>
                    <ChatBox
                      messages={messages}
                      handleMessage={handleMessage}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        ) : (
          <Col xs={12} className="text-center mt-5">
            <GoogleLogin
              clientId="446853568400-0ggh2lo8v2nn3kjat44mj6sk41i5uqlr.apps.googleusercontent.com"
              buttonText="Log in"
              onSuccess={(e) => handleUserObj(e.profileObj)}
              onFailure={(response) => console.log(response)}
              cookiePolicy={"single_host_origin"}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Main;
