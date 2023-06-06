import React from 'react'
import '../ProfilePage/ProfilePage.css'
import MessageIcon from "../../images/icons/message-icon.png"
import BackIcon from "../../images/icons/backIcon.png"
import ProfilePicture from "../../images/icons/profilepicdemo.png"

export default function ProfilePage(props) {
    return (
      <div className="profile-page-container">
        <div className="profile-page-cover">
          <img
            src={BackIcon}
            draggable="false"
            id="go-back"
            alt=""
            srcset=""
            onClick={() => props.handleExitClick()}
          />
          <img
            src={props.user.profile_picture || ProfilePicture}
            alt="Profile"
            className="profile-page-picture"
          />
        </div>
        <div className="profile-page-info-container">
          <div className="profile-page-first-last-name">
            <h3 id="profile-page-username"> {props.user.username} </h3>
            <p className="users_name">
              {props.user.first_name} {props.user.last_name}
            </p>
            <p className="users_email">{props.user.email}</p>

            <button id="signOut"> Sign Out </button>
          </div>
        </div>
      </div>
    );
}
