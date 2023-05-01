import React from "react";

export default function UsernameSignUp({
    newUser,
    handleChange,
    setFormNumber,
}) {
    async function handleUsernameSubmit(evt) {
        evt.preventDefault();
        setFormNumber(4);
    }

    return (
        <div className="signin-form-body">
            <form autoComplete="off" onSubmit={handleUsernameSubmit}>
                <input
                    placeholder="Username"
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button
                    className="signin-form-button"
                    type="submit">Next</button>
            </form>
        </div>
    );
}
