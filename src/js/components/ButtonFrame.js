import React from 'react';

class ButtonFrame extends React.Component {

	render() {

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
}

export default ButtonFrame;