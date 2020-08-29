import React from "react";

const LoggedInUsers = (props) => {
  const { users } = props;
  return (
    <div id="logged-in-users">
      <p>Online: {users.length}</p>
      <ul className="list-group list-group-flush">
        {users.map((el, idx) => (
          <li key={idx} className="list-group-item">
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoggedInUsers;
