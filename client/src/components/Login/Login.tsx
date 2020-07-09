import React, { FunctionComponent } from "react";
import steamLoginImage from './steam_button.png';
import steamLogo from '../../images/1200px-Breezeicons-apps-48-steam_v2.png';

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
          <img alt="loginButtonLink" src={steamLoginImage}></img>
        </a>
      </div>
    </div>
  );
};

export default Login;
