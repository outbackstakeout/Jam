import { Link } from "react-router-dom";
import * as userService from "../../utilities/users/users-service";
import "./NavBar.css";
import homeIcon from "../../images/icons/homeIcon.png";
import chatIcon from "../../images/icons/chatIcon.png";
import notificationIcon from "../../images/icons/notiBellIcon.png";
import ProfilePicture from "../../images/icons/profilepicdemo.png";
import { sendRequest } from "../../utilities/users/send-request";
import { useEffect } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function NavBar({ currentUser, jars, setJarList, pickJar, setCurrentJar, currentJar }) {
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
        setCurrentJar(jar);
        console.log(`Current Jar is: ${JSON.stringify(currentJar)}`)
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
                                className={`squircle purple-one ${currentJar._id === jar._id ? "active" : ""}`} // <-- add the 'selected' class if the jar is selected
                                onClick={() => handleClick(jar)}
                            >
                                <div className="popup">
                                    <h4 className="popup-text">{currentJar._id === jar._id ? currentJar.name : jar.name}</h4>
                                </div>
                            </li>
                        );
                    })}
                    {/*  */}
                    <AddBoxIcon
                        className="add_jar"
                        onClick={() => handleCreate()} />
                </ul>
            </nav>
        </div>
    );
}
