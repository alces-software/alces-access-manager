
import React from 'react';
import {Input} from 'react-bootstrap';
import FlipCard from 'react-flipcard';

export default class ClusterSelectionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  render() {
    const {name} = this.props;
    return (
      <div
        className="cluster-selection-box"
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        >
        <FlipCard
          disabled={true}
          flipped={this.state.isFlipped}
          >
          <div className="cluster-selection-box-front">{name}</div>
          <div className="cluster-selection-box-back">
            <Input label="Username" type="text"/>
            <Input label="Password" type="password"/>
          </div>
        </FlipCard>
      </div>
    );
  }

  handleFocus() {
    console.log(this.state.isFlipped); // eslint-disable-line no-console
    if (!this.state.isFlipped) {
      this.setFlipped(true);
    }
  }

  handleBlur() {
    this.setFlipped(false);
  }

  setFlipped(isFlipped) {
    const newState = {isFlipped}
    this.setState(newState);
  }
}
