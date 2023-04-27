import { Link } from "react-router-dom";
import * as userService from "../../utilities/users/users-service";
import "./NavBar.css";
import homeIcon from "../../images/icons/homeIcon.png";
import chatIcon from "../../images/icons/chatIcon.png";
import notificationIcon from "../../images/icons/notiBellIcon.png";
import ProfilePicture from "../../images/icons/profilepicdemo.png";

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <div className="navBar">
            <nav>
                <ul className="squircles">
                    <li className="squircle white-one"></li>
                    <li className="divider"></li>
                    <li className="squircle purple-one">
                        <div className="popup">
                            <h4 className="popup-text">JAM HQ</h4>
                        </div>
                    </li>
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
