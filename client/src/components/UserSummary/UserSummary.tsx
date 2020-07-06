import React, { FunctionComponent } from "react";
import "./UserSummary.scss";

const WORLD_FLAGS_URL: string =
  process.env.REACT_APP_WORLD_FLAGS_URL || "https://www.countryflags.io";

type UserSummaryProps = {
  username: string;
  countrycode: string;
  avatarfull: string;
};

const UserSummary: React.FC<UserSummaryProps> = (props) => {
  console.log(props)
  return (
    <div className="container">
      {props.avatarfull && (
        <img className="avatarFull" src={props.avatarfull} />
      )}
      {props.username && <div className="personaName">{props.username}</div>}
      {props.countrycode && (
        <img
          className="countryFlag"
          src={`${WORLD_FLAGS_URL}/${props.countrycode}/shiny/32.png`}
        ></img>
      )}
    </div>
  );
};

export default UserSummary;
