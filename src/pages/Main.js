import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import GoogleLogin from "react-google-login";
import UserContext from "../user-context";

// Import components
import UserInfo from "../components/UserInfo";
import LoggedInUsers from "../components/LoggedInUsers";
import ChatBox from "../components/ChatBox";

const Main = (props) => {
  const user = useContext(UserContext);
  const { setUserObj } = props;

  // MOCK ===========================================================================
  const img =
    "https://hips.hearstapps.com/digitalspyuk.cdnds.net/18/44/1540913834-sigourneyweaveravatar.jpg";
  const users = [
    {
      id: 1,
      name: "Test Name",
    },
    {
      id: 2,
      name: "Test Name 2",
    },
    {
      id: 3,
      name: "Test Name 3",
    },
    {
      id: 4,
      name: "Test Name 4",
    },
  ];

  const messages = [
    {
      name: "test name",
      msg:
        "test msg test msasd asdas dasdas asd asd asdasdasdasdasdasdas das as  das asd asd asdasdasdasg test msg",
      imgUrl: img,
    },
    {
      name: "test name",
      msg: "test msg test msg test msg",
      imgUrl: img,
    },
    {
      name: "test name",
      msg: "test msg test msg test msg",
      imgUrl: img,
    },
    {
      name: "test name",
      msg: "test msg test msg test msg",
      imgUrl: img,
    },
  ];

  const handleMessage = (msg) => {
    console.log("you are: ", user.name);
    console.log("your msg: ", msg);
    messages.unshift({ name: user.name, msg: msg, imgUrl: user.imageUrl });
  };
  return (
    <Container>
      <Row>
        {user ? (
          <Col xs={12} className="mt-5">
            <Card className="shadow">
              <CardBody>
                {console.log("user context: ", user)}
                <Row>
                  <Col
                    xs={3}
                    className="border-right"
                    style={{ minHeight: "300px" }}
                  >
                    <UserInfo setUserObj={setUserObj} user={user} />
                    <LoggedInUsers users={users} />
                  </Col>
                  <Col xs={9}>
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
          <GoogleLogin
            clientId="347289003118-u8h8hmu0g45nmpos6arbe5vttjnujnvt.apps.googleusercontent.com"
            buttonText="Log in"
            onSuccess={(e) => setUserObj(e.profileObj)}
            onFailure={() => console.log("Error w/ google OAuth")}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </Row>
    </Container>
  );
};

export default Main;
