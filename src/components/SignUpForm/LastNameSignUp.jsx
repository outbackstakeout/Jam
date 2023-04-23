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
                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={newUser.last_name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
