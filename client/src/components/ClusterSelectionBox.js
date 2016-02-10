
import React from 'react';
import FlipCard from 'react-flipcard';

export default class ClusterSelectionBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isFlipped: false };
  }

  render() {
    return (
      <div
        className="cluster-selection-box"
        onBlur={this.handleBlur.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        >
        <FlipCard
          className="card"
          disabled={true}
          flipped={this.state.isFlipped}
          >
          <div className="cluster-selection-box-front">Front</div>
          <div className="cluster-selection-box-back">Back</div>
        </FlipCard>
      </div>
    );
  }

  handleFocus() {
    this.setFlipped(true);
  }

  handleBlur() {
    this.setFlipped(false);
  }

  setFlipped(isFlipped) {
    const newState = {isFlipped}
    this.setState(newState);
  }
}
