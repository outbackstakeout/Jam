import React, { useEffect, useRef, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users/users-service";
import { sendRequest } from "../../utilities/users/send-request";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
// import ChatPage from "../ChatPage/ChatPage";
import AuthPage from "../AuthPage/AuthPage";
import Sidebar from "../../Sidebar.jsx";
import Chat from "../../Chat.jsx";
import FriendsList from "../../components/FriendsList/FriendsList";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { io } from "socket.io-client";

export default function App() {
    const [user, setUser] = useState(getUser());
    // const [socket, setSocket] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState("");
    const [showProfilePage, setShowProfilePage] = useState(false);
    const [jars, setJars] = useState([]);
    const [jams, setJams] = useState([]);
    const [currentJar, setCurrentJar] = useState({});
    const [currentJam, setCurrentJam] = useState({});
    let jarSelected;
    let jamSelected;

    const socketRef = useRef();
    let socket = socketRef.current;
    async function getJars() {
        const jarList = await sendRequest("/api/jars");
        setJars(jarList);
    }

    async function getJams() {
        const jamList = await sendRequest("/api/jams");
        setJams(jamList);
    }

    useEffect(() => {
            getJars();
            if (!socket) {
            socket = io({
                autoConnect: false,
            });
        }
        
       

        socket.connect();
        
    }, []);

    function pickJar(jar) {
        jarSelected = true;
        setCurrentJar(jar);
    }

    function pickJam(jam) {
        jamSelected = true;
        setCurrentJam(jam);
    }

    const handleFriendClick = () => {
        setShowProfilePage(true);
    };

    const handleExitClick = () => {
        setShowProfilePage(false);
    };

    return (
        <main className="App">
            {user ? (
                <>
                    <div className="container">
                        <NavBar
                            user={user}
                            setUser={setUser}
                            jars={jars}
                            getJars={getJars}
                        />
                        <Sidebar
                            setSelectedRoom={setSelectedRoom}
                            jams={jams}
                            user={user}
                            socket={socket}
                        />
                        <Chat selectedRoom={selectedRoom} jam={currentJam} socket={socket} />
                        {showProfilePage ? (
                            <ProfilePage handleExitClick={handleExitClick} />
                        ) : (
                            <FriendsList
                                handleFriendClick={handleFriendClick}
                            />
                        )}
                    </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
