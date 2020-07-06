import React, { FunctionComponent  } from 'react';
import './Welcome.scss';

type Welcome = {
  //
};

const Welcome: FunctionComponent = () => {

  return <div className="Container" >

    <video autoPlay={true} loop={true} muted className="Video" >
      {/*<source src="banner.mp4"  type="video/mp4" />*/}
      <source src="http://yuba.stanford.edu/~sundaes/CourseVid/banner.mp4" type="video/mp4" />
    </video>


    <div className="Content">
      <div className="SubContent" >
        <h1>SteamWreck</h1>
        {/*<button type="button" className="btn btn-outline-dark">View the course</button>*/}
      </div>
    </div>

    <div className="SigninButton">
<<<<<<< HEAD
      <a href="http://localhost:3001/auth/steam"><img src="https://lh3.googleusercontent.com/proxy/tj_6twfLEnqIsXcsUN_vsDBpax1YsRYxf8XJ_lMiBVzCSBW_XThpp0NaKQ4kZuJpb5NefxTKmS9udxdi_DckYRuD2rmz39MoXbHL3YoM7xPCQALA7lsrCrYXY32lA-9mwHn5xZ8"
      title="White flower" alt="Login with Steam" />
=======
      <a href="http://localhost:3001/auth/steam"><img src="https://lh3.googleusercontent.com/proxy/dJAZlLjlMtrtUuHnwohakTlHzOaqgJXqlX4YN9zDNSd11c_eTEhnEcvDotW6pzH6hRnaB4xqHThtgKFacFHdd0c98nU3a04E7ftN8GRSSK-RDP27OerXoUk1i5CfEwvwFa2114E"
      title="SteamSigninButton" alt="Login with Steam" />
>>>>>>> 612923d158bd8ac44872841528f851fbf82ecfe5
      </a>
    </div>

  </div>
};

export default Welcome;
