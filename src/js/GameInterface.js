  possibleCombinationSum = function(arr, n) {
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
  },
  StarsFrame = React.createClass( {displayName: "StarsFrame",

    render: function() {
      let stars = [];

      for ( let i = 0; i < this.props.numberOfStars; i++ ) {
        stars.push( React.createElement("span", {className: "glyphicon glyphicon-star"}) );
      }

      return (

        React.createElement("div", {id: "stars-frame"}, 
          React.createElement("div", {className: "well"}, 
              stars
          )
        )
      );
    }
  } ),
  ButtonFrame = React.createClass( {displayName: "ButtonFrame",

    render: function() {

      let disabled, button;

      switch( this.props.correct ) {
        case true:
          button = (
              React.createElement("button", {className: "btn btn-success btn-lg", 
                      onClick: this.props.acceptAnswer}, 
                React.createElement("span", {className: "glyphicon glyphicon-ok"})
              )
          );
          break;
        case false:
          button = (
              React.createElement("button", {className: "btn btn-danger btn-lg"}, 
                React.createElement("span", {className: "glyphicon glyphicon-remove"})
              )
          );
          break;
        default:
          button = (
              React.createElement("button", {className: "btn btn-primary btn-lg", 
                      disabled: !this.props.selectedNumbers.length, 
                      onClick: this.props.checkAnswer}, "=")
          );
      }
      return (

        React.createElement("div", {id: "button-frame"}, 
          button, 
          React.createElement("br", null), 
          React.createElement("br", null), 
          React.createElement("button", {className: "btn btn-warning btn-xs", 
                  onClick: this.props.redraw, 
                  disabled: !this.props.redraws}, 
            React.createElement("span", {className: "glyphicon glyphicon-refresh"}, 
              " ", 
              this.props.redraws
            )
          )
        )
      );
    }
  } ),
  AnswerFrame = React.createClass( {displayName: "AnswerFrame",

    render: function() {

      let selectedNumbers = this.props.selectedNumbers.map(
        number => React.createElement("span", {onClick: this.props.unselectNumber.bind( null, number)}, number)
      );

      return (

        React.createElement("div", {id: "answer-frame"}, 
          React.createElement("div", {className: "well"}, 
            selectedNumbers
          )
        )
      );
    }
  } ),
  NumbersFrame = React.createClass( {displayName: "NumbersFrame",

    render: function() {
      let numbers = [];

      for ( let i = 1; i < 10; i++ ) {
        let className = `number selected-${this.props.selectedNumbers.indexOf( i ) >= 0} `;
        className += `used-${this.props.usedNumbers.indexOf( i ) >= 0}`
        numbers.push(
          React.createElement("div", {className: className, 
               onClick: this.props.selectNumber.bind( null, i)}, i)
        );
      }
      return (

        React.createElement("div", {id: "numbers-frame"}, 
          React.createElement("div", {className: "well"}, 
            numbers
          )
        )
      );
    }
  } ),
  DoneFrame = React.createClass( {displayName: "DoneFrame",

    render: function() {
      return (
        React.createElement("div", {className: "well text-center"}, 
          React.createElement("h2", null, this.props.doneStatus)
        )
      );
    }
  } ),
  Game = React.createClass( {displayName: "Game",

    getInitialState: () => {
      return {
        numberOfStars: Math.floor( Math.random() * 9 ) + 1,
        selectedNumbers: [],
        usedNumbers: [],
        redraws: 5,
        correct: null,
        doneStatus: null
      };
    },

    generateRandomNumberOfStars: () => Math.floor( Math.random() * 9 ) + 1,

    selectNumber: function ( clickedNumber ) {
      if ( this.state.selectedNumbers.indexOf( clickedNumber ) < 0 ) {

        this.setState( {
          selectedNumbers: this.state.selectedNumbers.concat( clickedNumber ),
          correct: null
        } )
      }
    },
    unselectNumber: function ( clickedNumber ) {

      let selectedNumbers = this.state.selectedNumbers;

      selectedNumbers.splice( selectedNumbers.indexOf( clickedNumber ), 1 );

      this.setState( {
        selectedNumbers: selectedNumbers,
        correct: null
      } );
    },
    sumOfSelectedNumbers: function() {
      return this.state.selectedNumbers.reduce( ( p, n ) => p + n );
    },
    checkAnswer: function() {
      let correct = ( this.state.numberOfStars === this.sumOfSelectedNumbers() );
      this.setState( {
        correct
      } );
    },
    acceptAnswer: function() {
      let usedNumbers = this.state.usedNumbers.concat( this.state.selectedNumbers );

      this.setState( {
        usedNumbers,
        selectedNumbers: [],
        correct: null,
        numberOfStars: this.generateRandomNumberOfStars()
      } );
    },

    redraw: function() {

      if ( this.state.redraws ) {

        this.setState( {
          numberOfStars: this.generateRandomNumberOfStars(),
          correct: null,
          selectedNumbers: [],
          redraws: this.state.redraws - 1
        } );
      }
    },

    possibleSolutions: function() {
      let numberOfStars = this.state.numberOfStars,
          possibleNumbers = [],
          usedNumbers = this.state.usedNumbers;

      for ( let i = 0; i <= 9; i++ ) {
        if ( usedNumbers.indexOf( i ) < 0 ) {
          possibleNumbers.push( i );
        }
      }

      return possibleCombinationSum( possibleNumbers, numberOfStars );
    },

    updateDoneStatus: function() {
      if ( this.state.usedNumbers.length === 9 ) {
        this.setState( {
          doneStatus: 'Done. Nice!'
        } );
      } else if ( this.state.redraws === 0 && !this.possibleSolutions() ) {
        this.setState( {
          doneStatus: 'Game Over!'
        } );
      }
    },
    render: function() {

      let state = this.state,
          bottomFrame;

      if ( !state.doneStatus ) {
        bottomFrame = (
          React.createElement(NumbersFrame, {selectedNumbers: state.selectedNumbers, 
                        selectNumber: this.selectNumber, 
                        usedNumbers: state.usedNumbers})
          );
      } else {
          bottomFrame = ( React.createElement(DoneFrame, {doneStatus: state.doneStatus}) );
      }
      return (

        React.createElement("div", {id: "game"}, 
          React.createElement("h2", null, "Play Nine"), 
          React.createElement("hr", null), 
          React.createElement("div", {className: "clearfix"}, 
            React.createElement(StarsFrame, {numberOfStars: state.numberOfStars}), 
            React.createElement(ButtonFrame, {selectedNumbers: state.selectedNumbers, 
                         correct: state.correct, 
                         checkAnswer: this.checkAnswer, 
                         acceptAnswer: this.acceptAnswer, 
                         redraw: this.redraw, 
                         redraws: state.redraws}), 
            React.createElement(AnswerFrame, {selectedNumbers: state.selectedNumbers, 
                         unselectNumber: this.unselectNumber})
          ), 
          bottomFrame
        )
      );
    }
  } );

ReactDOM.render( React.createElement(Game, null), document.querySelector( '.container' ) );