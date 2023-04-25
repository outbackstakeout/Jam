import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users/users-service";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import ChatPage from "../ChatPage/ChatPage";
import AuthPage from "../AuthPage/AuthPage";

export default function App() {
    const [user, setUser] = useState(getUser());

    return (
        <main className="App">
            {user ? (
                <>
                    <NavBar user={user} setUser={setUser} />
                    <Routes>
                        <Route path="/" element={<ChatPage />}></Route>
                    </Routes>
                </>
            ) : (
                <AuthPage setUser={setUser} />
            )}
        </main>
    );
}
