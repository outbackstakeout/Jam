import React from "react";

export default function FirstNameSignUp({
    newUser,
    handleChange,
    setFormNumber,
}) {
    async function handleFirstNameSubmit(evt) {
        evt.preventDefault();
        setFormNumber(2);
    }

    return (
        <div className="form-container">
            <form autoComplete="off" onSubmit={handleFirstNameSubmit}>
                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Next</button>
            </form>
        </div>
    );
}
