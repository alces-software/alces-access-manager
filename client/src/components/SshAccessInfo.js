import React, { PropTypes } from 'react';

const propTypes = {
  cluster: PropTypes.object.isRequired,
  fullInfo: PropTypes.bool,
};

function SshAccessInfo({cluster, fullInfo}) {
  if (cluster.loginIp) {
    return (
      <p>
        {fullInfo ?
        `You can sign into this cluster directly with SSH, using the following
        command: `
        :
        'SSH access: '
        }
        <code>ssh {cluster.authenticated_username}@{cluster.loginIp}</code>
        {fullInfo ? '.' : ''}
      </p>
      );
  }
  else {
    // Once we use React 15.0 this branch won't be necessary (see:
    // https://github.com/facebook/react/pull/5884).
    return <noscript/>
  }
}

SshAccessInfo.propTypes = propTypes;
export default SshAccessInfo;

