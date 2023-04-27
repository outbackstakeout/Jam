import React from 'react';
import "./SidebarChannel.css";

function SidebarChannel({ id, channel, onClick }) {
  return (
    <div className="sidebarChannel" onClick={() => onClick(id)}>
        <h4><span className="sidebarChannel_hash">#</span>{ channel }</h4>
    </div>
  )
}

export default SidebarChannel