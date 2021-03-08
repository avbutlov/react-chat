import React from "react";
import "./online-users.css";

const OnlineUsers = ({ users }) => {
  return (
    <div className="online-users">
      <b>Online: {users.length}</b>
      <ul>
        {users.map((name, ind) => {
          return <li key={`${name}${ind}`}>{name}</li>;
        })}
      </ul>
    </div>
  );
};

export default OnlineUsers;
