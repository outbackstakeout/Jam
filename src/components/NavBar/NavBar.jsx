// import * as userService from "../../utilities/users/users-service";
import "./NavBar.css";
import { sendRequest } from "../../utilities/users/send-request";
import { useEffect } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function NavBar({
    // Inherited and destructured props
    currentUser,
    getJars,
    jars,
    setJarList,
    setCurrentJar,
    currentJar,
    getJams,
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
        // console.log("📍 handleCreate() function in NavBar.jsx");
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
        } catch (err) {
            console.log(
                `handleCreate() in NavBar.jsx says the error is: ${err}`
            );
        }
    }

    function handleClick(jar) {
        setCurrentJar(jar);
        getJams();
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
                                className={`squircle purple-one ${
                                    currentJar._id === jar._id ? "active" : ""
                                }`} // <-- add the 'selected' class if the jar is selected
                                onClick={() => handleClick(jar)}
                            >
                                <div className="popup">
                                    <h4 className="popup-text">
                                        {currentJar._id === jar._id
                                            ? currentJar.name
                                            : jar.name}
                                    </h4>
                                </div>
                            </li>
                        );
                    })}
                    <AddBoxIcon
                        className="add_jar"
                        onClick={() => handleCreate()}
                    />
                </ul>
            </nav>
        </div>
    );
}
