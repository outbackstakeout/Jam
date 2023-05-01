import { useState } from "react";
import * as usersService from "../../utilities/users/users-service";
import '../LoginForm/LoginForm.css'
import jamlogo from '../../images/icons/jamtransparent.png'


export default function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

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
        } catch {
            setError("Log In Failed - Try Again");
        }
    }

    return (

        <div className="signin-form-body">
            <div className="signin-form-content">
                <div className="signin-form-content">
                    <div className="jam-logo-container">
                        <img src={jamlogo} alt="jam logo" />
                    </div>

                </div>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="signin-form-input"
                        required
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="signin-form-input"
                        required
                    />
                    <div className="signup-form-button">
                        <div className="signinout-button">

                            <button className="signin-form-button " type="submit">LOG IN</button>


                        </div>

                    </div>

                </form>
                <p className="error-message">&nbsp;{error}</p>
            </div>
        </div>
    );
}
