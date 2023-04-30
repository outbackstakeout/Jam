import React, { useState, useEffect, useRef } from "react";
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
import SidebarChannel from "./SidebarChannel";
// import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import EditIcon from "@mui/icons-material/Edit";

// 🎉 user might drill in here
function Sidebar({ setSelectedRoom, jams, socket, currentJar, pickJar }) {
    const [rooms, setRooms] = useState([]);
    const [jarName, setJarName] = useState(currentJar.name);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        socket.on("roomCreated", (room) => {
            console.log("Room Created: ", room);
            setRooms((rooms) => [...rooms, room]);
        });

        socket.on("jarRenamed", (renamedJar) => {
            console.log(`The new jar name is ${renamedJar.name}`);
            pickJar(renamedJar);
            setJarName(renamedJar.name);
        });

        return () => {
            socket.off("roomCreated");
            socket.off("jarRenamed");
        };
    }, []);

    const handleCreateRoom = () => {
        console.log("Creating a new room...");
        const newRoom = {
            id: uuidv4(),
            name: prompt("Enter a name for the new room:"),
            // user: user,
        };
        if (newRoom.name) {
            socket.emit("createRoom", newRoom);
            socket.emit("joinRoom", newRoom.id);
        }
    };

    // function isn't getting called
    function handleNewJarName(e) {
        console.log("🛶🛶🛶");
        e.preventDefault();
        const newJarName = jarName;
        const jarId = currentJar._id;
        console.log(
            `handleNewJarName() in sidebar says the jarName is: ${jarName} and the jarId is: ${jarId}`
        );
        if (jarId) {
            socket.emit("renameJar", jarId, newJarName);
        }
        setEditing(false);
    }

    function handleEditClick() {
        setEditing(true);
    }

    function handleNameChange(e) {
        setJarName(e.target.value);
    }

    const handleRoomClick = (roomId, roomName) => {
        // setSelectedRoom({ id: roomId, name: roomName });
        setSelectedRoom(roomName);
        socket.emit("joinRoom", roomId);
    };

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
                        jarName
                        // currentJar.name
                        // `${currentJar._id}`
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
                    <h3>@seanmunjal</h3>
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
