import React from "react";
import "./styles.css";

function BotMessage({ message }) {
  return (
    <div className="bot_message_container">
      <img src="assets/robot.png" alt="avatar" className="avatar_image" />
      <div className="background_effect">
        <div className="effect " />
      </div>
      <div className="bot_message">{message}</div>
    </div>
  );
}

export default BotMessage;
