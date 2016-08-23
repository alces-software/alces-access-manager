
import React, {PropTypes} from 'react';
import {Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {Icon} from 'flight-common';

class ToolbarButton extends React.Component {
  render() {
    const {iconName, tooltip} = this.props;

    const tooltipElement = <Tooltip id={iconName}>{tooltip}</Tooltip>;

    return (
      <OverlayTrigger placement="top" overlay={tooltipElement}>
        <Button {...this.props}>
          <Icon name={`aam-${iconName}`}/>
        </Button>
      </OverlayTrigger>
    );
  }
}

ToolbarButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default ToolbarButton;

