import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatPage.css";

function ChatPage() {
    const [input, setInput] = useState("");

    const socketRef = useRef();

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io();
        }

        // define the socket authentication as the web's current token
        socketRef.current.auth = {
            token: localStorage.getItem("token"),
        };

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setInput("");
    }

    return (
        <div className="ChatPage">
            <h1>ChatPage</h1>
            <div className="chat-box"></div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <input type="text" value={input} onChange={handleChange} />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ChatPage;
