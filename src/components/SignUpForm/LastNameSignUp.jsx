import React from "react";
import "../../pages/AuthPage/AuthPage.css";

export default function LastNameSignUp({
    newUser,
    handleChange,
    setFormNumber,
}) {
    async function handleLastNameSubmit(evt) {
        evt.preventDefault();
        setFormNumber(3);
    }

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleLastNameSubmit}>
                <h3>Put a label on that Jar!</h3>
                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
