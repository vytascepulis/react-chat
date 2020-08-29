import React from "react";

const UserInfo = (props) => {
  const { setUserObj, user } = props;
  return (
    <div id="user-info" className="d-flex flex-row align-items-center">
      <img src={user.imageUrl} className="rounded-circle mr-3" height="60px" />
      <div>
        <strong className="d-block">{user.name}</strong>
        <a href="#" onClick={() => setUserObj()}>
          Log out
        </a>
      </div>
    </div>
  );
};

export default UserInfo;
