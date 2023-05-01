import React from "react";
import jamlogo from '../../images/icons/jamtransparent.png'
export default function EmailSignUp({ newUser, handleChange, setFormNumber }) {
    async function handleEmailSubmit(evt) {
        evt.preventDefault();
        setFormNumber(5);
    }

    return (


        <div className="signin-form-body">
            <div className="jam-logo-container">
                <img src={jamlogo} alt="jam logo" />
            </div>
            <form autoComplete="off" onSubmit={handleEmailSubmit}>
                <input
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={newUser.email}
                    onChange={handleChange}
                    className="signin-form-input"
                    required
                />
                <button
                    className="signin-form-button" type="submit">Next</button>
            </form>
        </div>
    );
}
