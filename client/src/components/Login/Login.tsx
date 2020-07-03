import React, { FunctionComponent, ReactChildren } from "react";
import { Redirect } from "react-router-dom";
const SERVER_URL: string = "http://localhost:3001/auth/steamananınanı";
type LoginProps = {
  history: any;
};

const Login: FunctionComponent<LoginProps> = (props) => {
  return (
    <div className="">
      <div className="">
        I already know my Steam ID:
      </div>
    <div>
      <a href="http://localhost:3001/auth/steam">
        Login
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png"></img>
      </a>
    </div>
    </div>
  );
};

export default Login;
