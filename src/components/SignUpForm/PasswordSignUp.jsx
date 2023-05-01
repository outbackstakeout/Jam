import React from "react";
import jamlogo from '../../images/icons/jamtransparent.png'

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
            <div className="jam-logo-container">
                <img src={jamlogo} alt="jam logo" />
            </div>
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
                <button
                    className="signin-form-button"
                    type="submit" disabled={disable}>
                    Sign Up
                </button>
            </form>
        </div>
    );
}
