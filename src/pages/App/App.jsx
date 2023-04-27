import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users/users-service";
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

    return (
        <main className="App">
            {user ? (
                <>
                    <div className="container">
                        <NavBar user={user} setUser={setUser} />                   
                        <Sidebar setSelectedRoom={setSelectedRoom} />
                        <Chat selectedRoom={selectedRoom} />
                        <FriendsList />                    
                    </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
