import React, { useState, useEffect } from "react";

// Import pages
import Main from "./pages/Main";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import style
import "./scss/themes.scss";
// Import context
import UserContext from "./user-context";
// Import socket config
import { socket } from "./service/socket";

function App() {
  const [userObj, setUserObj] = useState();
  const sessionItem = JSON.parse(sessionStorage.getItem("userObj"));

  useEffect(() => {
    if (sessionItem) {
      setUserObj(sessionItem);
      socket.emit("new-user", sessionItem.name);
    }
  }, []);

  const handleUserObj = (obj) => {
    setUserObj(obj);
    if (obj !== null && obj !== undefined) {
      sessionStorage.setItem("userObj", JSON.stringify(obj));
      socket.emit("new-user", obj.name);
    } else {
      sessionStorage.clear();
      socket.emit("disconnect-manually");
    }
  };

  return (
    <>
      <UserContext.Provider value={userObj}>
        <Main setUserObj={handleUserObj} />
      </UserContext.Provider>
    </>
  );
}

export default App;
