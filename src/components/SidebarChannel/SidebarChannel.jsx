import React from "react";
import "./SidebarChannel.css";

function SidebarChannel({ id, channel, selected, onClick, setSelectedRoom }) {
    const handleClick = () => {
        setSelectedRoom({ name: channel, id: id });
        onClick();
    };
    return (
        <div
            className={`sidebarChannel ${
                selected && "sidebarChannel--selected"
            }`}
            onClick={handleClick}
        >
            <h4>
                <span className="sidebarChannel_hash">#</span>
                {channel}
            </h4>
        </div>
    );
}

export default SidebarChannel;
