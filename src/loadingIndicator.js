import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner';

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress &&
    <div style={{
        width: "100%",
        height: "50",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      >
      <Loader type="ThreeDots" color="#38001b" height="20" width="60" />
    </div>
  );
}

export default LoadingIndicator;
