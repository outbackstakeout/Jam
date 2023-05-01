import React from "react";
import jamlogo from "../../images/icons/jamtransparent.png";

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
            <div className="jam-logo-container">
                <img src={jamlogo} alt="jam logo" />
            </div>
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
