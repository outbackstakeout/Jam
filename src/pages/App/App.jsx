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
// import * as socket from "../../utilities/socket";

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
    // let socket = socketRef.current;
    async function getJars() {
        console.log("getJars() function in App.jsx");
        const jarList = await sendRequest("/api/jars");
        // console.log(jarList);
        setJars(jarList);
    }

    // async function getJams() {
    //     const jamList = await sendRequest("/api/jams");
    //     setJams(jamList);
    // }

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = io({
                autoConnect: false,
            });
        }

        socketRef.current.connect();
    }, []);

    function pickJar(jar) {
        console.log("pickJar() in App.jsx hit successfully");
        console.log(
            `The jar that pickJar() received from NavBar is: ${jar.name}`
        );
        console.log(
            `The current jar before resetting it is ${currentJar.name}`
        );
        jarSelected = true;
        setCurrentJar(jar);
        console.log(`And now the current jar is: ${currentJar.name}`);
    }

    function setJarList(newJar) {
        setJars((jars) => [...jars, newJar]);
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
                            currentUser={user}
                            jars={jars}
                            setJarList={setJarList}
                            pickJar={pickJar}
                            getJars={getJars}
                        />

                        {socketRef.current && (
                            <>
                                <Sidebar
                                    setSelectedRoom={setSelectedRoom}
                                    jams={jams}
                                    user={user}
                                    socket={socketRef.current}
                                    currentJar={currentJar}
                                    pickJar={pickJar}
                                />
                                <Chat
                                    selectedRoom={selectedRoom}
                                    jam={currentJam}
                                    socket={socketRef.current}
                                />
                            </>
                        )}

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
