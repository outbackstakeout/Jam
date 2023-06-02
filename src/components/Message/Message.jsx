import React from "react";
import "./Message.css";
import ProfilePicture from "../../images/icons/profilepicdemo.png";

function Message({ msg, user }) {
    const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div className="message">
            <img
                className="pfp"
                src={user.profile_picture || ProfilePicture}
                alt="The user's profile"
            />
            <div className="message_info">
                <h4>
                    {user.username}
                    <span className="message_timestamp">{timestamp}</span>
                </h4>

                <p>{msg.text}</p>
            </div>
        </div>
    );
}

export default Message;
