import React from 'react';

class NumbersFrame extends React.Component {
    
    render() {

	  let numbers = [];

	  for ( let i = 1; i < 10; i++ ) {
	    let className = `number selected-${this.props.selectedNumbers.indexOf( i ) >= 0} `;
	    className += `used-${this.props.usedNumbers.indexOf( i ) >= 0}`
	    numbers.push(
	      <div className={className}
	           onClick={this.props.selectNumber.bind( null, i )}>{i}</div>
	    );
	  }
	  return (

	    <div id="numbers-frame">
	      <div className="well">
	        {numbers}
	      </div>
	    </div>
	  );
	}
}

export default NumbersFrame;
