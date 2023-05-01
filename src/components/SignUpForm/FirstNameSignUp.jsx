import React from "react";
import jamlogo from "../../images/icons/jamtransparent.png";

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
        <div className="signin-form-body">
            <div className="jam-logo-container">
                <img src={jamlogo} alt="jam logo" />
            </div>
            <form autoComplete="off" onSubmit={handleFirstNameSubmit}>
                <input
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    value={newUser.first_name}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button className="signin-form-button" type="submit">Next</button>
            </form>
        </div>
    );
}
