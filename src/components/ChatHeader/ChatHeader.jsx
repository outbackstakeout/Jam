import React from 'react'
import './ChatHeader.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';

function ChatHeader(channel) {
  return (
    <div className = "chatHeader">
        <div className="chatHeader_left">
            <h3><span className="chatHeader_hash">#</span>
            {channel.channel}
            </h3>
        </div>
        <div className="chatHeader_right">
            <NotificationsIcon />
            <EditLocationIcon />
            <PeopleAltIcon />
        </div>
        <div className="chatHeader_search">
            <input placeholder ="Search" />
            <SearchIcon />
        </div>
            <SendIcon />
            <HelpIcon />
    </div>
  )
}

export default ChatHeader