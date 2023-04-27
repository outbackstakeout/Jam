import React from 'react';
import "./SidebarChannel.css";

function SidebarChannel({ id, channel, selected, onClick }) {
  return (
    <div
      className={`sidebarChannel ${selected && "sidebarChannel--selected"}`}
      onClick={() => onClick(id, channel)}
    >
      <h4><span className="sidebarChannel_hash">#</span>{channel}</h4>
    </div>
  )
}

export default SidebarChannel