import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";

function Message({ msg }) {
    const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return (
        <div className="message">
            <Avatar />
            <div className="message_info">
                <h4>
                    seanmunjal
                    <span className="message_timestamp">
                        {timestamp}
                    </span>
                </h4>

                <p>{msg.text}</p>
            </div>
        </div>
    );
}

export default Message;
