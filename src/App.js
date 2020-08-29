import React, { useState, useEffect } from "react";

// Import pages
import Main from "./pages/Main";

// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import style
import "./scss/themes.scss";

// Import context
import UserContext from "./user-context";

function App() {
  const [userObj, setUserObj] = useState();
  const sessionItem = JSON.parse(sessionStorage.getItem("userObj"));

  useEffect(() => {
    if (sessionItem) {
      setUserObj(sessionItem);
    }
  }, []);

  const handleUserObj = (obj) => {
    setUserObj(obj);
    if (obj !== null && obj !== undefined) {
      sessionStorage.setItem("userObj", JSON.stringify(obj));
    } else {
      sessionStorage.clear();
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
