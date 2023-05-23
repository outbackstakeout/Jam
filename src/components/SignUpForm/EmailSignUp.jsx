import React from "react";
import "../../pages/AuthPage/AuthPage.css";

export default function EmailSignUp({ newUser, handleChange, setFormNumber }) {
    async function handleEmailSubmit(evt) {
        evt.preventDefault();
        setFormNumber(5);
    }

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleEmailSubmit}>
                <h3>Return to Sender?</h3>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
