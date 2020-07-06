import React, { FunctionComponent  } from 'react';
import './Welcome.scss';

type Welcome = {
  //
};

const Welcome: FunctionComponent = () => {
  //const videoSource = "https://vimeo.com/user118858358/review/435027108/56242f510b"

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
      <a href="http://localhost:3001/auth/steam"><img src="https://lh3.googleusercontent.com/proxy/FXM9QUG4FHIxo2KK5VfB_enVMGUI4vPT8Pqn9lOYDw8yRaQ42stnLjFxKpUYnnzYQKbGbdIJbDl3Et5WTA"
      title="White flower" alt="Login with Steam" />
      </a>
    </div>

  </div>
};

export default Welcome;
