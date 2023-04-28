import React, { useEffect, useState } from "react";
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

export default function App() {
    const [user, setUser] = useState(getUser());

    const [selectedRoom, setSelectedRoom] = useState("")
    const [jars, setJars] = useState([]);
    const [jams, setJams] = useState([]);
    const [currentJar, setCurrentJar] = useState({});
    const [currentJam, setCurrentJam] = useState({});
    let jarSelected;
    let jamSelected;

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
    }, []);

    function pickJar(jar) {
        jarSelected = true;
        setCurrentJar(jar);
    }

    function pickJam(jam) {
        jamSelected = true;
        setCurrentJam(jam);
    }

    return (
        <main className="App">
            {user ? (
                <>
                    <div className="container">
                        <NavBar user={user} setUser={setUser} jars={jars} />                   
                        <Sidebar setSelectedRoom={setSelectedRoom} jams={jams} />
                        <Chat selectedRoom={selectedRoom} jam={currentJam}/>
                        <FriendsList />                    
                    </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
