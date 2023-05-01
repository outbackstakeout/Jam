import { Avatar } from "@mui/material";
import React from "react";
import "./Message.css";

function Message({ msg }) {
    return (
        <div className="message">
            <Avatar />
            <div className="message_info">
                <h4>
                    seanmunjal
                    <span className="message_timestamp">
                        this is a timestamp
                    </span>
                </h4>

                <p>{msg.text}</p>
            </div>
        </div>
    );
}

export default Message;
