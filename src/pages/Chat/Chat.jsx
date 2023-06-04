import React, { useState, useEffect } from "react";
import "./Chat.css";
import ChatHeader from "../../components/ChatHeader/ChatHeader.jsx";
import Message from "../../components/Message/Message.jsx";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";

function Chat({ selectedRoom, socket, user, msgs, setMsgs }) {
    const [input, setInput] = useState("");
    // const [msgs, setMsgs] = useState([]);

    // async function getMessages() {
    //     console.log("📍 getMessages() function in Chat.jsx");
    //     if (selectedRoom.name) {
    //         console.log(
    //             `getMessages in chat.jsx says the selectedRoom name is: ${selectedRoom.name}`
    //         );
    //         const msgLog = await sendRequest(
    //             `/api/messages/${selectedRoom.id}`
    //         );
    //         console.log(`getMessages() function in Chat.jsx msgLog: ${msgLog}`);
    //         setMsgs(msgLog);
    //         return;
    //     }
    //     console.log(
    //         "❓ getMessages() function in Chat.jsx says no room has been selected"
    //     );
    // }

    useEffect(() => {
        // getMessages();

        socket.on("newMsg", (newMsg) => {
            setMsgs((msgs) => [...msgs, newMsg.text]);
        });

        return () => {
            socket.off("newMsg");
        };
    }, [socket, setMsgs]);

    function handleChange(e) {
        setInput(e.target.value);
    }

    async function handleSubmit(e) {
        console.log("📍 handleSubmit() in Chat.jsx");
        e.preventDefault();
        const newMsg = { jam: selectedRoom.id, user: user._id, text: input };
        setMsgs((msgs) => [...msgs, newMsg]);

        // 💡 to server.js > io.on > socket.on
        socket.emit("sendMsg", newMsg);
        console.log(newMsg);

        setInput("");
    }

    return (
        <div className="chat">
            <ChatHeader
                channel={selectedRoom.name ? selectedRoom.name : null}
            />

            <div className="chat_messages">
                {/* pass luke msgs state down as a prop */}

                {msgs.length > 0
                    ? msgs.map((msg) => {
                          return (
                              <Message key={msg._id} msg={msg} user={user} />
                          );
                      })
                    : null}
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
