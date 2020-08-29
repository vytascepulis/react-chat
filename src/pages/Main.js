import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import GoogleLogin from "react-google-login";
import UserContext from "../user-context";

// Import components
import UserInfo from "../components/UserInfo";
import LoggedInUsers from "../components/LoggedInUsers";
import ChatBox from "../components/ChatBox";

// Import socket config
import { socket } from "../service/socket";

const Main = (props) => {
  const user = useContext(UserContext);
  const { setUserObj } = props;
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const handleMessage = (message) => {
    let { name, imageUrl } = user;
    socket.emit("message", { name, message, imageUrl });
  };

  useEffect(() => {
    socket.on("message", ({ name, message, imageUrl }) => {
      setMessages([{ name, message, imageUrl }, ...messages]);
    });
    socket.on("loggedin-update", (users) => {
      setUsers(users);
    });
  });

  return (
    <Container>
      <Row>
        {user ? (
          <Col xs={12} className="px-0 px-sm-3 mt-0 mt-sm-4">
            <Card className="shadow">
              <CardBody>
                <Row>
                  <Col xs={12} md={3} className="border-right">
                    <UserInfo setUserObj={setUserObj} user={user} />
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
              clientId="347289003118-u8h8hmu0g45nmpos6arbe5vttjnujnvt.apps.googleusercontent.com"
              buttonText="Log in"
              onSuccess={(e) => setUserObj(e.profileObj)}
              onFailure={() => console.log("Error w/ google OAuth")}
              cookiePolicy={"single_host_origin"}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Main;
