import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../utilities/users/users-service";
import { sendRequest } from "../../utilities/users/send-request";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import Chat from "../Chat/Chat.jsx";
import FriendsList from "../../components/FriendsList/FriendsList";
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import { io } from "socket.io-client";

export default function App() {
    // States
    const [user, setUser] = useState(getUser());
    const [selectedRoom, setSelectedRoom] = useState("");
    const [showProfilePage, setShowProfilePage] = useState(false);
    const [jars, setJars] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [currentJar, setCurrentJar] = useState({});

    // Store a mutable ref object to be updated later
    const socketRef = useRef();

    // UseEffect() - to be called once upon component's loading
    useEffect(() => {
        // Initialize socket connection
        if (!socketRef.current) {
            socketRef.current = io({
                autoConnect: false,
            });
        }

        socketRef.current.connect();
    }, []);

    async function getJars() {
        // console.log("📍 getJars() function in App.jsx");
        const jarList = await sendRequest("/api/jars");
        setJars(jarList);
    }

    async function getJams() {
        console.log("📍 getJams() function in App.jsx");

        if (selectedRoom) {
            const jamList = await sendRequest(`/api/jams/${currentJar._id}`);
            setRooms(jamList);
        }
    }

    function setJarList(newJar) {
        // console.log("📍 setJarList() function in App.jsx");
        setJars((jars) => [...jars, newJar]);
    }

    function handleFriendClick() {
        setShowProfilePage(true);
    }

    function handleExitClick() {
        setShowProfilePage(false);
    }

    return (
        <main className="App">
            {user ? (
                <>
                    <div className="container">
                        <div className="container-1">
                            <NavBar
                                currentUser={user}
                                jars={jars}
                                setJarList={setJarList}
                                getJars={getJars}
                                getJams={getJams}
                                currentJar={currentJar}
                                setCurrentJar={setCurrentJar}
                            />
                        </div>
                        {socketRef.current && (
                            <>
                                <div className="container-2">
                                    <Sidebar
                                        setSelectedRoom={setSelectedRoom}
                                        selectedRoom={selectedRoom}
                                        user={user}
                                        socket={socketRef.current}
                                        currentJar={currentJar}
                                        setCurrentJar={setCurrentJar}
                                        getJars={getJars}
                                        rooms={rooms}
                                        setRooms={setRooms}
                                    />
                                </div>
                                <div className="container-3">
                                    <Chat
                                        selectedRoom={selectedRoom}
                                        socket={socketRef.current}
                                        user={user}
                                    />
                                </div>
                            </>
                        )}
                        <div className="container-4">
                            {showProfilePage ? (
                                <ProfilePage
                                    user={user}
                                    handleExitClick={handleExitClick}
                                />
                            ) : (
                                <FriendsList
                                    user={user}
                                    handleFriendClick={handleFriendClick}
                                />
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
