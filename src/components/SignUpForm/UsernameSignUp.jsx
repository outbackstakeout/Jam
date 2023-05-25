import React from "react";

import "../../pages/AuthPage/AuthPage.css";


export default function UsernameSignUp({
    newUser,
    handleChange,
    setFormNumber,
}) {
    async function handleUsernameSubmit(evt) {
        evt.preventDefault();
        setFormNumber(4);
    }

    return (
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleUsernameSubmit}>
          <h3>Put a label on that Jar!</h3>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            value={newUser.username}
            onChange={handleChange}
            required
          />
          <button type="submit">Next</button>
        </form>
      </div>

    );
}
