import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";

const ChatBox = (props) => {
  const { messages, handleMessage } = props;
  const [textarea, setTextarea] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMessage(textarea);
    e.target.children[0].value = "";
    setTextarea();
  };

  return (
    <>
      <div id="chat-box">
        <ul className="messages">
          {messages.map((el, idx) => (
            <li className="message" key={idx}>
              <div className="author-info">
                <img src={el.imgUrl} className="rounded" />
                <span className="message-author">{el.name}</span>
              </div>
              <span className="message-text">{el.msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <Form id="chat-form" onSubmit={(e) => handleSubmit(e)}>
        <Input onChange={(e) => setTextarea(e.target.value)}></Input>
        <Button color="primary" className="ml-2" type="submit">
          Send
        </Button>
      </Form>
    </>
  );
};

export default ChatBox;
