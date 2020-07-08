import React, { } from "react";
import User from "../../../types/User"
import "./UserSummary.scss";

const WORLD_FLAGS_URL: string =
  process.env.REACT_APP_WORLD_FLAGS_URL || "https://www.countryflags.io";

type UserSummaryProps = {
  currentUser:User;
};

const UserSummary: React.FC<UserSummaryProps> = (props) => {
  const { currentUser } = props;
  return (
    <div className="container">
      {currentUser.avatarfull && (
        <img alt="userAvatar" className="avatarFull" src={currentUser.avatarfull} />
      )}
      {currentUser.username && <div className="personaName">{currentUser.username}</div>}
      {currentUser.countrycode && (
        <img
          alt={`${currentUser.countrycode}-flag`}
          className="countryFlag"
          src={`${WORLD_FLAGS_URL}/${currentUser.countrycode}/shiny/32.png`}
        ></img>
      )}
    </div>
  );
};

export default UserSummary;
