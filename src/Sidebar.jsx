import React from 'react'
import './Sidebar.css'
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import Avatar from '@mui/material/Avatar';
import MicIcon from '@mui/icons-material/Mic';
import SettingsIcon from '@mui/icons-material/Settings';
import HeadsetIcon from '@mui/icons-material/Headset';
import SidebarChannel from './SidebarChannel';



function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar_top">
        <h3>Sean Munjal</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar_channels">
        <div className="sidebar_channelsHeader">
          <div className="sidebar_header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon className="sidebar_addChannel" />
        </div>
        <div className="sidebar_channelsList">
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
          <SidebarChannel />
        </div>
      </div>

      <div className="sidebar_voice">
        <SignalCellularAltIcon className="sidebar_voiceIcon" fontSize="large" />
        <div className="sidebar_voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar_voiceIcons">
          <InfoIcon />
          <CallIcon />
        </div>
        </div>
        <div className="sidebar_profile">
          <Avatar src="https://cdn.discordapp.com/attachments/1067565429771481131/1067565566413516961/95705FF1-2815-442F-B814-08C2F99B0C8F.jpg" />
          <div className="sidebar_profileInfo">
            <h3>@seanmunjal</h3>
            <p>#thisismyID</p>
          </div>
          <div className="sidebar_profileIcons">
            <MicIcon />
            <HeadsetIcon />
            <SettingsIcon />
          </div>
        </div>
      </div>
  )
}

export default Sidebar