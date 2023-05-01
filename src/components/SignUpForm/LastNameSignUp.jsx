import React from "react";

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
                <input
                    placeholder="Last Name"
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
