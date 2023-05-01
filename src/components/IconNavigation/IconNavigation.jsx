import React from 'react'
import "../IconNavigation/IconNavigation.css";
import homeIcon from "../../images/icons/homeIcon.png";
import chatIcon from "../../images/icons/chatIcon.png";
import notificationIcon from "../../images/icons/notiBellIcon.png";

export default function IconNavigation() {
  return (
    <header className="header">
    <div className="nav-icons">
      <Link to="/">
        <img src={homeIcon} alt="Home" className="icon" />
      </Link>
      <Link to="/inbox">
        <img src={chatIcon} alt="Inbox" className="icon" />
      </Link>
      <Link to="/notifications">
        <img src={notificationIcon} alt="Notifications" className="icon" />
      </Link>
    </div>
  </header>
  )
}
