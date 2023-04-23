import React from "react";

export default function EmailSignUp({ newUser, handleChange, setFormNumber }) {
    async function handleEmailSubmit(evt) {
        evt.preventDefault();
        setFormNumber(5);
    }

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleEmailSubmit}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
