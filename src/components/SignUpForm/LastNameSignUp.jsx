import React from "react";
import jamlogo from '../../images/icons/jamtransparent.png'
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
        <div className="signin-form-body">
            <div className="jam-logo-container">
                <img src={jamlogo} alt="jam logo" />
            </div>
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
                <button
                    className="signin-form-button"
                    type="submit">Next</button>
            </form>
        </div>
    );
}
