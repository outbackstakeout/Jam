import React, { useState, useEffect, useRef } from 'react';
import './Sidebar.css';
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
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';


function Sidebar({ setSelectedRoom }) {
  const [rooms, setRooms] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io({
        autoConnect: false,
        path: '/socket'
      });
    }
    const socket = socketRef.current;

    socket.connect();

    socket.on('roomCreated', (room) => {
      console.log('Room Created: ', room);
      setRooms((rooms) => [...rooms, room]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    console.log('Creating a new room...');
    const newRoom = {
      id: uuidv4(),
      name: prompt("Enter a name for the new room:")
    };
    if (newRoom.name) {
      setRooms([...rooms, newRoom]);
      socketRef.current.emit("createRoom", newRoom);
      socketRef.current.emit("joinRoom", newRoom.id);
    }
  };

  const handleRoomClick = (roomId, roomName) => {
    setSelectedRoom({id: roomId, name: roomName});
    socketRef.current.emit("joinRoom", roomId);
    

  }

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

          <AddIcon
            className="sidebar_addChannel"
            onClick={() => handleCreateRoom()}
          />
        </div>
        <div className="sidebar_channelsList">
          {rooms.map((room) => (
            <SidebarChannel 
            key={uuidv4()} 
            id={room.id} 
            channel={room.name}
            selected={room.id === setSelectedRoom}
            onClick={() => handleRoomClick(room.id, room.name)}
            setSelectedRoom = {setSelectedRoom} />
          ))}
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
  );
}

export default Sidebar