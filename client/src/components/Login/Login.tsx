import React, { FunctionComponent } from "react";
// const SERVER_URL: string = "http://localhost:3001/auth/steamananınanı";
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
          <img alt="loginButtonLink" src="./steam_button.png"></img>
        </a>
      </div>
    </div>
  );
};

export default Login;
