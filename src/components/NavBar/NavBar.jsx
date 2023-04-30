import { Link } from "react-router-dom";
import * as userService from "../../utilities/users/users-service";
import "./NavBar.css";
import homeIcon from "../../images/icons/homeIcon.png";
import chatIcon from "../../images/icons/chatIcon.png";
import notificationIcon from "../../images/icons/notiBellIcon.png";
import ProfilePicture from "../../images/icons/profilepicdemo.png";
import { sendRequest } from "../../utilities/users/send-request";
import { useEffect } from "react";

export default function NavBar({
    currentUser,
    jars,
    setJarList,
    pickJar,
    getJars,
}) {
    // we wanna move this to user profile
    // function handleLogOut() {
    //     userService.logOut();
    //     setUser(null);
    // }

    useEffect(() => {
        getJars();
    }, []);

    async function handleCreate() {
        try {
            const payload = {
                name: "Fresh Jar",
                jams: [],
                user: currentUser,
            };
            const newJar = await sendRequest(
                "/api/jars/create",
                "POST",
                payload
            );
            setJarList(newJar);
            console.log("HANDLE CREATE");
        } catch (err) {
            console.log(`handleCreate() in NavBar says the error is: ${err}`);
        }
    }

    function handleClick(jar) {
        pickJar(jar);
    }

    return (
        <div className="navBar">
            <nav>
                <ul className="squircles">
                    <li className="squircle white-one"></li>
                    <li className="divider"></li>
                    {jars.map((jar) => {
                        return (
                            <li
                                key={jar._id}
                                className="squircle purple-one"
                                onClick={() => handleClick(jar)}
                            >
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
                </ul>
            </nav>
        </div>
    );
}
