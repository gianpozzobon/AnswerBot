import React from "react";
import "./styles.css";

function UserMessage({ message }) {
  return (
    <div className="user_message_container">
      <div className="user_message">{message}</div>
      <div className="user_background_effect">
        <div className="user_effect " />
      </div>
      <img src="assets/avatar.png" alt="avatar" className="user_avatar_image" />
    </div>
  );
}

export default UserMessage;
