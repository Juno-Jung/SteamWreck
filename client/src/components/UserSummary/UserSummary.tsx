import React, { } from "react";
import "./UserSummary.scss";

const WORLD_FLAGS_URL: string =
  process.env.REACT_APP_WORLD_FLAGS_URL || "https://www.countryflags.io";

type UserSummaryProps = {
  username: string;
  countrycode: string;
  avatarfull: string;
};

const UserSummary: React.FC<UserSummaryProps> = (props) => {
  return (
    <div className="container">
      {props.avatarfull && (
        <img alt="userAvatar" className="avatarFull" src={props.avatarfull} />
      )}
      {props.username && <div className="personaName">{props.username}</div>}
      {props.countrycode && (
        <img
          alt={`${props.countrycode}-flag`}
          className="countryFlag"
          src={`${WORLD_FLAGS_URL}/${props.countrycode}/shiny/32.png`}
        ></img>
      )}
    </div>
  );
};

export default UserSummary;
