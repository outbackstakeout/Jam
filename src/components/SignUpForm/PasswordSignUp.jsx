import React from "react";

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
        <div className="form-container">
            <form autoComplete="off" onSubmit={handlePasswordSubmit}>
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    required
                />
                <label>Confirm</label>
                <input
                    type="password"
                    name="confirm"
                    value={newUser.confirm}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={disable}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
