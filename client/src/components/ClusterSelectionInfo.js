import React, { PropTypes } from 'react';

const propTypes = {
  cluster: PropTypes.object.isRequired,
};

function ClusterSelectionInfo({cluster}) {
  // Note: we now only display the cluster IP in development as this is the AAM
  // server accessible IP, with no guarantee that user's outside the cluster
  // network will be able to access this, so displaying this in production
  // could only cause potential confusion.
  return (
    <div>
      <p>
        <strong>{cluster.name}</strong>
      </p>
      {__DEVELOPMENT__ ?
      <p>
        IP: {cluster.ip}
      </p>
      : null
      }
    </div>
  )
}

ClusterSelectionInfo.propTypes = propTypes;
export default ClusterSelectionInfo;

