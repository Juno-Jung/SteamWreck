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
      <a href="http://localhost:3001/auth/steam"><img src="https://lh3.googleusercontent.com/proxy/HvjWdKnQKMDgq21by3QbFrTAqaTQrowPYK-EjoZNqCK5quMmTN4LeQPwRMeSafrVcV2AGY6rY1UN8riGGJg4o3kGJLqKqa0y5xSIv7FxguO338_jRCBz9mtemSLRGQ5pgcGs7tc"
      title="SteamSigninButton" alt="Login with Steam" />
      </a>
    </div>

  </div>
};

export default Welcome;
