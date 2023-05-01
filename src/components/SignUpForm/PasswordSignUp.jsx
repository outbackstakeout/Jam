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
                <input
                    placeholder="Password"
                    type="text"
                    name="password"
                    value={newUser.password}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <input
                    placeholder="Confirm Password"
                    type="password"
                    name="confirm"
                    value={newUser.confirm}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button type="submit" disabled={disable}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
