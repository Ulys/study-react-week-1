let
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
  StarsFrame = React.createClass( {

    render: function() {
      let stars = [];

      for ( let i = 0; i < this.props.numberOfStars; i++ ) {
        stars.push( <span className="glyphicon glyphicon-star"></span> );
      }

      return (

        <div id="stars-frame">
          <div className="well">
              {stars}
          </div>
        </div>
      );
    }
  } ),
  ButtonFrame = React.createClass( {

    render: function() {

      let disabled, button;

      switch( this.props.correct ) {
        case true:
          button = (
              <button className="btn btn-success btn-lg"
                      onClick={this.props.acceptAnswer}>
                <span className="glyphicon glyphicon-ok"></span>
              </button>
          );
          break;
        case false:
          button = (
              <button className="btn btn-danger btn-lg">
                <span className="glyphicon glyphicon-remove"></span>
              </button>
          );
          break;
        default:
          button = (
              <button className="btn btn-primary btn-lg"
                      disabled={!this.props.selectedNumbers.length}
                      onClick={this.props.checkAnswer}>=</button>
          );
      }
      return (

        <div id="button-frame">
          {button}
          <br />
          <br />
          <button className="btn btn-warning btn-xs"
                  onClick={this.props.redraw}
                  disabled={!this.props.redraws}>
            <span className="glyphicon glyphicon-refresh">
              &nbsp;
              {this.props.redraws}
            </span>
          </button>
        </div>
      );
    }
  } ),
  AnswerFrame = React.createClass( {

    render: function() {

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
  } ),
  NumbersFrame = React.createClass( {

    render: function() {
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
  } ),
  DoneFrame = React.createClass( {

    render: function() {
      return (
        <div className="well text-center">
          <h2>{this.props.doneStatus}</h2>
        </div>
      );
    }
  } ),
  Game = React.createClass( {

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
          <NumbersFrame selectedNumbers={state.selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={state.usedNumbers}/>
          );
      } else {
          bottomFrame = ( <DoneFrame doneStatus={state.doneStatus}/> );
      }
      return (

        <div id="game">
          <h2>Play Nine</h2>
          <hr />
          <div className="clearfix">
            <StarsFrame numberOfStars={state.numberOfStars}/>
            <ButtonFrame selectedNumbers={state.selectedNumbers}
                         correct={state.correct}
                         checkAnswer={this.checkAnswer}
                         acceptAnswer={this.acceptAnswer}
                         redraw={this.redraw}
                         redraws={state.redraws}/>
            <AnswerFrame selectedNumbers={state.selectedNumbers}
                         unselectNumber={this.unselectNumber}/>
          </div>
          {bottomFrame}
        </div>
      );
    }
  } );

ReactDOM.render( <Game />, document.querySelector( '.container' ) );
