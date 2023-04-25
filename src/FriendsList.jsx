import React from 'react'
import './FriendsList.css'
import ProfilePicture from "./images/icons/profilepicdemo.png"

function FriendsList() {
  return (
    <main className="main">
    <section className="friends-list">
      <h4 className="friend-title">Friends:</h4>
      <div className="friend-item">
        <img src={ProfilePicture} alt="Profile" className="profile-pic" />
        <span className="friend-name">John Doe</span>
      </div>
      <div className="friend-item">
        <img src={ProfilePicture} alt="Profile" className="profile-pic" />
        <span className="friend-name">John Doe</span>
      </div>
      <div className="friend-item">
        <img src={ProfilePicture} alt="Profile" className="profile-pic" />
        <span className="friend-name">John Doe</span>
      </div>
      <div className="friend-item">
        <img src={ProfilePicture} alt="Profile" className="profile-pic" />
        <span className="friend-name">John Doe</span>
      </div>
    </section>
  </main>
  )
}

export default FriendsList