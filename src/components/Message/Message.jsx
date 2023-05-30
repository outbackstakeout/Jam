import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";
import ProfilePicture from "../../images/icons/profilepicdemo.png"

function Message(props) {
    const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
      <div className="message">
          <img className="pfp" src={props.user.profile_picture || ProfilePicture} alt="Profile Picture" />
        <div className="message_info">
          <h4>
            {props.user.username}
            <span className="message_timestamp">{timestamp}</span>
          </h4>

          <p>{props.msg.text}</p>
        </div>
      </div>
    );
}

export default Message;
