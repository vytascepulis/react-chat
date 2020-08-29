import React, { useState, useEffect } from "react";

// Import pages
import Main from "./pages/Main";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Import style
import "./scss/themes.scss";
// Import context
import UserContext from "./user-context";
// Import firebase config
import { fire } from "./firebase";

function App() {
  const [userObj, setUserObj] = useState();
  const sessionItem = JSON.parse(sessionStorage.getItem("userObj"));
  const loggedIn = fire.database().ref("loggedIn");
  const messages = fire.database().ref("messages");

  // Delete from loggedIn db
  window.addEventListener("unload", () => {
    loggedIn.child(sessionItem.googleId).remove();
  });

  useEffect(() => {
    if (sessionItem) {
      setUserObj(sessionItem);
      loggedIn.child(sessionItem.googleId).set({ name: sessionItem.name });
    }
  }, []);

  const handleUserObj = (obj) => {
    if (obj !== null && obj !== undefined) {
      sessionStorage.setItem("userObj", JSON.stringify(obj));
      loggedIn.child(obj.googleId).set({ name: obj.name });
    } else {
      sessionStorage.clear();
      loggedIn.child(userObj.googleId).remove();
    }
    setUserObj(obj);
  };

  return (
    <>
      <UserContext.Provider value={userObj}>
        <Main handleUserObj={handleUserObj} />
      </UserContext.Provider>
    </>
  );
}

export default App;
