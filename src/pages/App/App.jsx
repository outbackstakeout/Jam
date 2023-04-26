import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import "./App.css";
import AuthPage from "../AuthPage/AuthPage";
import NavBar from "../../components/NavBar/NavBar";
import Sidebar from "../../Sidebar.jsx"
import Chat from "../../Chat.jsx";
import FriendsList from "../../components/FriendsList/FriendsList";


export default function App() {
    const [user, setUser] = useState(getUser());

    return (
        <main className="App">
            {user ? (
                <>
                <div className="container">
                    <NavBar user={user} setUser={setUser} />
                    <Sidebar />
                    <Chat />
                    <FriendsList />
                </div>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
