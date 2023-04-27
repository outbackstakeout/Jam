import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { sendRequest } from "./utilities/users/send-request";
import "./Chat.css";
import ChatHeader from "./ChatHeader.jsx";
import Message from "./Message.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";

function Chat() {
    // include pre-return functions from ChatPage.jsx

    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState([]);

    async function getMessages() {
        const msgLog = await sendRequest("/api/messages");
        console.log(msgLog);
        setMsgs(msgLog);
    }

    const socketRef = useRef();

    useEffect(() => {
        getMessages();

        if (!socketRef.current) {
            socketRef.current = io({
                autoConnect: false,
            });
        }
        const socket = socketRef.current;

        socket.connect();

        // 💡 from server.js > io.on > socket.on > socket.broadcast.emit("newMsg")
        socket.on("newMsg", (msg) => {
            // const newMsg = { text: msg }
            setMsgs((msgs) => [...msgs, msg]);
        });

        return () => {
            socket.off("newMsg");
            socket.disconnect();
        };
    }, []);

    function handleChange(e) {
        setInput(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newMsg = { text: input };

        setMsgs((msgs) => [...msgs, newMsg]);

        // 💡 to server.js > io.on > socket.on
        socketRef.current.emit("sendMsg", input);

        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader />

            <div className="chat_messages">
                {/* pass luke msgs state down as a prop */}
                {msgs.map((msg) => {
                    return <Message msg={msg} />;
                })}
            </div>
            <div className="chat_input">
                <AddCircleIcon fontSize="large" />
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={`Message #TESTCHANNEL`}
                        value={input}
                        onChange={handleChange}
                    />
                    <button className="chat_inputButton" type="submit">
                        Send Message
                    </button>
                </form>
                <div className="chat_inputIcons">
                    <CardGiftcardIcon fontSize="large" />
                    <GifIcon fontSize="large" />
                    <EmojiEmotionsIcon fontSize="large" />
                </div>
            </div>
        </div>
    );
}

export default Chat;
