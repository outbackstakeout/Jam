import React from "react";

export default function CreateJar({ user }) {
    const [newJar, setNewJar] = useState({
        name: "",
        jams: [],
        users: [user],
    });

    function handleChange(e) {
        setNewJar({
            ...newJar,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Please label your jar</label>
                <input
                    type="text"
                    name="name"
                    value={newJar.name}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create</button>
            </form>
        </>
    );
}
