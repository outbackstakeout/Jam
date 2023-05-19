import { useState } from "react";
import * as usersService from "../../utilities/users/users-service";
import '../../pages/AuthPage/AuthPage.css'
import './LoginForm.css'
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //function to handle login button click
  const handleLoginClick = () => {
    navigate("/Chat");
  };

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate("/Chat")
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

  return (
    <div className="signin-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label className="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label className="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <div className="button">
            <button id="signin_btn" onClick={handleLoginClick}>
              LOG IN
            </button>
          </div>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
