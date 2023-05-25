import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import InfoIcon from "@mui/icons-material/Info";
import CallIcon from "@mui/icons-material/Call";
import Avatar from "@mui/material/Avatar";
import MicIcon from "@mui/icons-material/Mic";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetIcon from "@mui/icons-material/Headset";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function Sidebar({
    // Inherited and destructured props
    setSelectedRoom,
    jams,
    user,
    socket,
    currentJar,
    setCurrentJar,
    getJars,
}) {
    // States
    const [rooms, setRooms] = useState([]);
    const [jarName, setJarName] = useState("");
    const [editing, setEditing] = useState(false);

    // UseEffect() - to be called once upon component's loading
    useEffect(() => {
        if (currentJar.name) {
            setJarName(currentJar.name);
        }

        socket.on("roomCreated", (room) => {
            console.log("Room Created: ", room);
            setRooms((rooms) => [...rooms, room]);
        });

        socket.on(`jarRenamed/${currentJar._id}`, (renamedJar) => {
            setCurrentJar(renamedJar);
            console.log(`🥨 The new jar name is ${renamedJar.name}`);
            // pickJar(renamedJar);
            setJarName(renamedJar.name);
            getJars();
        });

        // Return statement contains clean-up functions to be called when the component is exited
        return () => {
            socket.off("roomCreated");
            socket.off("jarRenamed");
        };
    }, [currentJar.name, setCurrentJar, socket]);

    async function handleNewJarName(e) {
        // console.log("📍 handleNewJarName(e) in Sidebar.jsx");
        e.preventDefault();
        const newJarName = jarName;
        const jarId = currentJar._id;
        console.log(
            `handleNewJarName() in Sidebar.jsx says jarName: ${jarName} and jarId: ${jarId}`
        );
        if (jarId) {
            try {
                // 🔗 server.js > app.post("/rename-jar")
                const res = await axios.post("/rename-jar", {
                    jarId: jarId,
                    newJarName: newJarName,
                });
                const renamedJar = res.data;
                setCurrentJar((currentJar) => ({
                    ...currentJar,
                    name: renamedJar.name,
                }));
                socket.emit("renameJar", jarId, newJarName);
            } catch (err) {
                console.log(err);
            }
        }
        setEditing(false);
    }

    function handleEditClick() {
        setEditing(!editing);
    }

    function handleNameChange(e) {
        setJarName(e.target.value);
    }

    function handleCreateRoom() {
        // console.log("📍 handleCreateRoom() in Sidebar.jsx");
        const newRoom = {
            name: prompt("Enter a name for the new room:"),
            messages: [],
            users: [user],
            jar: currentJar._id,
            socket_id: uuidv4(),
        };
        if (newRoom.name) {
            socket.emit("createRoom", newRoom);
            socket.emit("joinRoom", newRoom.socket_id);
        }
    }

    function handleRoomClick(roomId, roomName) {
        setSelectedRoom(roomName);
        socket.emit("joinRoom", roomId);
    }

    return (
        <div className="sidebar">
            <div className="sidebar_top">
                <h3>
                    {editing ? (
                        <form onSubmit={handleNewJarName}>
                            <input
                                type="text"
                                name="name"
                                value={jarName}
                                onChange={handleNameChange}
                                required
                            />
                            <button type="submit" hidden></button>
                        </form>
                    ) : (
                        currentJar.name
                    )}
                </h3>
                <EditIcon
                    className="sidebar_changeJarName"
                    onClick={handleEditClick}
                />
            </div>
            <div className="sidebar_channels">
                <div className="sidebar_channelsHeader">
                    <div className="sidebar_header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon
                        className="sidebar_addChannel"
                        onClick={() => handleCreateRoom()}
                    />
                </div>
                <div className="sidebar_channelsList">
                    {rooms.map((room) => (
                        <SidebarChannel
                            key={uuidv4()}
                            id={room.id}
                            channel={room.name}
                            selected={room.id === setSelectedRoom}
                            onClick={() => handleRoomClick(room.id, room.name)}
                            setSelectedRoom={setSelectedRoom}
                        />
                    ))}
                </div>
            </div>

            <div className="sidebar_voice">
                <SignalCellularAltIcon
                    className="sidebar_voiceIcon"
                    fontSize="large"
                />
                <div className="sidebar_voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>

                <div className="sidebar_voiceIcons">
                    <InfoIcon />
                    <CallIcon />
                </div>
            </div>
            <div className="sidebar_profile">
                <Avatar src="https://cdn.discordapp.com/attachments/1067565429771481131/1067565566413516961/95705FF1-2815-442F-B814-08C2F99B0C8F.jpg" />
                <div className="sidebar_profileInfo">
                    <h3>@{user.username}</h3>
                    <p>#thisismyID</p>
                </div>
                <div className="sidebar_profileIcons">
                    <MicIcon />
                    <HeadsetIcon />
                    <SettingsIcon />
                </div>
            </div>
        </div>
    );

    // <div className="sidebar_channelsList">
    //     {jams.map((jamItem) => {
    //         return <SidebarChannel jam={jamItem} />;
    //     })}
    // </div>;
}

export default Sidebar;
