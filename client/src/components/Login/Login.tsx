import React, { FunctionComponent  } from 'react';

type LoginProps = {
  //
};

const Login: FunctionComponent = () => {
  return <div><a href='http://localhost:3001/auth/steam'>Login
  <img src='https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png'></img>
  </a>
  </div>;
};

export default Login;
