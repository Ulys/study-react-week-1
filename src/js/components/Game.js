
import React from 'react';
import DoneFrame from './DoneFrame';
import NumbersFrame from './NumbersFrame';
import AnswerFrame from './AnswerFrame';
import ButtonFrame from './ButtonFrame';
import StarsFrame from './StarsFrame';

const possibleCombinationSum = function(arr, n) {
		if (arr.indexOf(n) >= 0) { return true; }
		if (arr[0] > n) { return false; }
		if (arr[arr.length - 1] > n) {
		  arr.pop();
		  return possibleCombinationSum(arr, n);
		}
		var listSize = arr.length, combinationsCount = (1 << listSize);
		for (var i = 1; i < combinationsCount ; i++ ) {
			var combinationSum = 0;
			for (var j=0 ; j < listSize ; j++) {
				if (i & (1 << j)) { combinationSum += arr[j]; }
			}
			if (n === combinationSum) { return true; }
			return false;
		}
	}

class Game extends React.Component {
	
	getInitialState() {
      return {
        numberOfStars: Math.floor( Math.random() * 9 ) + 1,
        selectedNumbers: [],
        usedNumbers: [],
        redraws: 5,
        correct: null,
        doneStatus: 'null'
      };
    }

    generateRandomNumberOfStars() {
    	return Math.floor( Math.random() * 9 ) + 1;
    }

    resetGame() {
      this.replaceState( this.getInitialState() );
    }

    selectNumber( clickedNumber ) {
      if ( this.state.selectedNumbers.indexOf( clickedNumber ) < 0 ) {

        this.setState( {
          selectedNumbers: this.state.selectedNumbers.concat( clickedNumber ),
          correct: null
        } )
      }
    }

    unselectNumber( clickedNumber ) {

      let selectedNumbers = this.state.selectedNumbers;

      selectedNumbers.splice( selectedNumbers.indexOf( clickedNumber ), 1 );

      this.setState( {
        selectedNumbers: selectedNumbers,
        correct: null
      } );
    }

    sumOfSelectedNumbers() {
      return this.state.selectedNumbers.reduce( ( p, n ) => p + n );
    }

    checkAnswer() {
      let correct = ( this.state.numberOfStars === this.sumOfSelectedNumbers() );
      this.setState( {
        correct
      } );
    }

    acceptAnswer() {
      let usedNumbers = this.state.usedNumbers.concat( this.state.selectedNumbers );

      this.setState( {
        usedNumbers,
        selectedNumbers: [],
        correct: null,
        numberOfStars: this.generateRandomNumberOfStars()
      }, function() {
        this.updateDoneStatus();
      } );
    }

    redraw() {

      if ( this.state.redraws ) {

        this.setState( {
          numberOfStars: this.generateRandomNumberOfStars(),
          correct: null,
          selectedNumbers: [],
          redraws: this.state.redraws - 1
        }, function() {
          this.updateDoneStatus();
        }  );
      }
    }

    possibleSolutions() {
      let numberOfStars = this.state.numberOfStars,
          possibleNumbers = [],
          usedNumbers = this.state.usedNumbers;

      for ( let i = 0; i <= 9; i++ ) {
        if ( usedNumbers.indexOf( i ) < 0 ) {
          possibleNumbers.push( i );
        }
      }

      return possibleCombinationSum( possibleNumbers, numberOfStars );
    }

    updateDoneStatus() {
      if ( this.state.usedNumbers.length === 9 ) {
        this.setState( {
          doneStatus: 'Done. Nice!'
        } );
      } else if ( this.state.redraws === 0 && !this.possibleSolutions() ) {
        this.setState( {
          doneStatus: 'Game Over!'
        } );
      }
    }

    render() {

      let state = this.state,
          bottomFrame;

      if ( !state.doneStatus ) {
        bottomFrame = (
          <NumbersFrame selectedNumbers={state.selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={state.usedNumbers} />
          );
      } else {
          bottomFrame = ( <DoneFrame doneStatus={state.doneStatus}
                                     resetGame={this.resetGame} /> );
      }
      return (

        <div id="game">
          <h2>Play Nine</h2>
          <hr />
          <div className="clearfix">
            <StarsFrame numberOfStars={state.numberOfStars} />
            <ButtonFrame selectedNumbers={state.selectedNumbers}
                         correct={state.correct}
                         checkAnswer={this.checkAnswer}
                         acceptAnswer={this.acceptAnswer}
                         redraw={this.redraw}
                         redraws={state.redraws} />
            <AnswerFrame selectedNumbers={state.selectedNumbers}
                         unselectNumber={this.unselectNumber} />
          </div>
          {bottomFrame}
        </div>
      );
    }
}

export default Game;