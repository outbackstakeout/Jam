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
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleUsernameSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
