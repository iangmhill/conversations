import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './BranchSelection.css';

class BranchSelection extends Component {
  render() {
    const {
      branches,
      onBranch,
    } = this.props;

    // Create a button element for each branch option
    const branchElems = branches.map((branch, index) => {
      return (
        <li className="BranchSelection-branch-li" key={index}>
          <button 
            onClick={() => onBranch(branch.videoId)}
            className="BranchSelection-branch-button"
          >
            <img
              src={branch.imageURI}
              alt={`Video choice number ${index}`}
              className="BranchSelection-branch-image"
            />
          </button>
        </li>
      )
    })

    return (
      <div>
        <ul className="BranchSelection-ul">
          {branchElems}
        </ul>
      </div>
    );
  }
}

BranchSelection.propTypes = {
  branches: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string.isRequired,
      imageURI: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBranch: PropTypes.func.isRequired,
}

export default BranchSelection;
