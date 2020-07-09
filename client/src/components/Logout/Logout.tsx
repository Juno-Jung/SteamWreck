import React, { FunctionComponent  } from 'react';
import { Redirect } from 'react-router-dom'
type LogoutProps = {
  setIsAuth:any,

};
const Logout: FunctionComponent<LogoutProps> = (props) => {

  props.setIsAuth(false)
  localStorage.removeItem("steamid")
  localStorage.removeItem("auth")
  return <div><Redirect to='/'></Redirect></div>;
};

export default Logout;
