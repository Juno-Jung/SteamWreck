import React, { FunctionComponent  } from 'react';
import auth from '../utils/auth'
import { Redirect } from 'react-router-dom'
type LogoutProps = {
  setIsAuth:any,

};

const Logout: FunctionComponent<LogoutProps> = (props) => {

  props.setIsAuth(false)
  return <div><Redirect to='/'></Redirect></div>;
};

export default Logout;
