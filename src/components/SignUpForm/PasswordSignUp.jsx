import React from "react";

import "../../pages/AuthPage/AuthPage.css";


export default function PasswordSignUp({
    newUser,
    handleChange,
    setFormNumber,
    handleSubmit,
}) {
    async function handlePasswordSubmit(evt) {
        handleSubmit(evt);
        setFormNumber(6);
    }

    const disable = newUser.password !== newUser.confirm;

    return (
        <div className="signin-form-body">
            <form autoComplete="off" onSubmit={handlePasswordSubmit}>
                <h3>Seal That Lid!</h3>
                <label>Password</label>

                <input
                    type="text"
                    name="password"
                    placeholder="Choose Password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    value={newUser.confirm}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button
                    className="signin-form-button"
                    type="submit" disabled={disable}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
