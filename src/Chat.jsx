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

function Chat({ selectedRoom, socket }) {
    // include pre-return functions from ChatPage.jsx
    // console.log(selectedRoom);

    const [input, setInput] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [roomMessages, setRoomMessages] = useState({});

    async function getMessages() {
        const msgLog = await sendRequest(`/api/messages/${selectedRoom.id}`);

        //i could use prevState and a ...prevState thing to bring back previous messages from state, but not sure exactly how
        console.log(msgLog);
        setMsgs(msgLog);
    }

    // const socketRef = useRef();
    const roomIdRef = useRef();

    useEffect(() => {
        setMsgs([]);
        getMessages();

        // if (!socket) {
        //     socket = io({
        //         autoConnect: false,
        //     });
        // }
        // const socket = socketRef.current;

        if (selectedRoom) {
            // Set the room ID so it can be accessed inside socket callbacks
            roomIdRef.current = selectedRoom.id;

            // Get the messages for the selected room
            getMessages(selectedRoom.id).then((msgLog) => {
                setMsgs(msgLog);
            });

            // Connect the socket to the server
            // socket.connect();

            // Set up the event listeners for the selected room
        }
        socket.on("newMsg", (msg) => {
            // if (msg.roomId === roomIdRef.current) {
            // }
            const newMsg = { text: msg };
            setMsgs((msgs) => [...msgs, newMsg]);
        });

        // Join the selected room
        // socket.emit("joinRoom", selectedRoom.id);

        return () => {
            socket.off("newMsg");
            // socket.disconnect();
        };
    }, [selectedRoom]);

    function handleChange(e) {
        setInput(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const newMsg = { text: input };
        // roomId: selectedRoom.id place this in next to text input

        setMsgs((msgs) => [...msgs, newMsg]);
        console.log("handle submit is working");
        // 💡 to server.js > io.on > socket.on
        socket.emit("sendMsg", input);
        console.log(newMsg);

        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader channel={selectedRoom?.name || ""} />

            <div className="chat_messages">
                {/* pass luke msgs state down as a prop */}
                {msgs.map((msg) => {
                    return <Message msg={msg} />;
                })}
            </div>
            <div className="chat_input">
                <AddCircleIcon fontSize="large" id="add-circle-icon" />
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={`Message #${selectedRoom?.name || ""}`}
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
