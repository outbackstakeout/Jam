import React, { useState, useEffect } from "react";
import "./ChatPage.css";

function ChatPage() {
    const [input, setInput] = useState("");

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
