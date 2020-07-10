import React, { FunctionComponent  } from 'react';

type SpinnerProps = {
  //
};

const Spinner: FunctionComponent = () => {
  return <div className="container">
      <div className="center">
        <img src="https://workbench.tv/content/tutorials/2016-10-21_RingOfFire/assets/RingOfFire.gif"
             title="LoadingData" alt="Spinner" />
      </div>
  </div>;
};

export default Spinner;
