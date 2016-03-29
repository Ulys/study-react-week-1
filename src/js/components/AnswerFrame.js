
import React from 'react';

class AnswerFrame extends React.Component {

	render() {

	  let selectedNumbers = this.props.selectedNumbers.map(
	    number => <span onClick={this.props.unselectNumber.bind( null, number )}>{number}</span>
	  );

	  return (

	    <div id="answer-frame">
	      <div className="well">
	        {selectedNumbers}
	      </div>
	    </div>
	  );
	}
}

export default AnswerFrame;