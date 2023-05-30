import React from "react";

import "../../pages/AuthPage/AuthPage.css";

export default function PfpSignUp({
  newUser,
  handleChange,
  setFormNumber,
}) {
  async function handleProfilePicChange(evt) {
    evt.preventDefault();
    setFormNumber(5);
  }

  return (
    <div className="signin-form-body">
      <form autoComplete="off" onSubmit={handleProfilePicChange}>
        <h3>How do we look?</h3>
        <label>Profile Pic!</label>

        <input
          type="text"
          name="profile_picture"
          placeholder="Pic URL"
          value={newUser.profile_picture}
          onChange={handleChange}
          className="signin-form-input"
          required
        />
        <button className="signin-form-button" type="submit">
          Next
        </button>
      </form>
    </div>
  );
}
