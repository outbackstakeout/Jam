import { Link } from "react-router-dom";
import * as userService from "../../utilities/users/users-service";
import "./NavBar.css";
import homeIcon from "../../images/icons/homeIcon.png";
import chatIcon from "../../images/icons/chatIcon.png";
import notificationIcon from "../../images/icons/notiBellIcon.png";
import ProfilePicture from "../../images/icons/profilepicdemo.png";
import { sendRequest } from "../../utilities/users/send-request";

export default function NavBar({ user, setUser, jars }) {
    // we wanna move this to user profile
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    function handleCreate() {
        sendRequest("/api/jars/create", "POST");
    }

    return (
        <div className="navBar">
            <nav>
                <ul className="squircles">
                    <li className="squircle white-one"></li>
                    <li className="divider"></li>

                    {/*  */}
                    {jars.map((jar) => {
                        return (
                            <li className="squircle purple-one">
                                <div className="popup">
                                    <h4 className="popup-text">{jar.name}</h4>
                                </div>
                            </li>
                        );
                    })}
                    {/*  */}
                    <button onClick={handleCreate}>
                        <li className="squircle purple-one">
                            <div className="popup">
                                <h4 className="popup-text">JAM HQ</h4>
                            </div>
                        </li>
                    </button>
                    <li className="squircle purple-one">
                        <div className="popup">
                            <h4 className="popup-text">CREW</h4>
                        </div>
                    </li>
                    <li className="squircle green-one">
                        <div className="popup">
                            <h4 className="popup-text">GYM SQUAD</h4>
                        </div>
                    </li>
                    <li className="squircle green-one">
                        <div className="popup">
                            <h4 className="popup-text">CODERS</h4>
                        </div>
                    </li>
                    <li className="squircle purple-one">
                        <div className="popup">
                            <h4 className="popup-text">THE DEFTONES</h4>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
